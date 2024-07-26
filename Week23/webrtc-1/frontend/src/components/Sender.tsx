import { useCallback, useEffect, useRef, useState } from 'react';

const WEBSOCKET_URL = 'ws://localhost:8080';

export default function Sender() {
  const [status, setStatus] = useState<string>('Not connected');
  const socketRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const createPeerConnection = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({ type: 'iceCandidate', candidate: event.candidate });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
      setStatus(`ICE connection state: ${pc.iceConnectionState}`);
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      setStatus(`Connection state: ${pc.connectionState}`);
      if (pc.connectionState === 'connected') {
        console.log('Sender: Connection established. Checking media tracks...');
        const senders = pc.getSenders();
        senders.forEach((sender) => {
          if (sender.track) {
            console.log(`Sender: Sending ${sender.track.kind} track`);
          }
        });
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  }, []);

  const sendMessage = useCallback((message: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Unable to send message.');
      setStatus('WebSocket is not open');
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      setStatus('WebSocket connected');
      sendMessage({ type: 'sender' });
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      switch (message.type) {
        case 'createAnswer':
          try {
            await peerConnectionRef.current?.setRemoteDescription(
              new RTCSessionDescription(message.sdp)
            );
            console.log('Remote description set');
            setStatus('Remote description set');
          } catch (error) {
            console.error('Error setting remote description:', error);
            setStatus('Error setting remote description');
          }
          break;
        case 'iceCandidate':
          try {
            await peerConnectionRef.current?.addIceCandidate(
              new RTCIceCandidate(message.candidate)
            );
            console.log('ICE candidate added');
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
          break;
        case 'receiverReady':
          console.log('Receiver is ready. Initiating connection...');
          initiateConnection();
          break;
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed. Reconnecting...');
      setStatus('WebSocket closed. Reconnecting...');
      retryWebSocketConnection(0);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('WebSocket error');
    };
  }, []);

  const retryWebSocketConnection = (retryCount: number) => {
    const maxRetries = 5;
    const baseDelay = 1000; // 1 second
    if (retryCount < maxRetries) {
      const delay = baseDelay * Math.pow(2, retryCount);
      console.log(`Retrying WebSocket connection in ${delay}ms...`);
      setTimeout(() => {
        connectWebSocket();
      }, delay);
    } else {
      console.error('Max WebSocket connection retries reached');
      setStatus('Unable to connect to WebSocket server');
    }
  };

  const initiateConnection = useCallback(async () => {
    console.log('Initiating connection');
    setStatus('Initiating connection');

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not ready. Reconnecting...');
      connectWebSocket();
      return;
    }

    const pc = createPeerConnection();

    try {
      if (!localStreamRef.current) {
        console.log('Requesting media stream...');
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
          console.log('Local video stream set');
        }
      }
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
        console.log(`Added ${track.kind} track to peer connection`);
      });
      setStatus('Media stream added to peer connection');

      console.log('Creating offer...');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendMessage({ type: 'createOffer', sdp: pc.localDescription });
      console.log('Offer sent');
      setStatus('Offer sent');
    } catch (err) {
      console.error('Error in initiateConnection:', err);
      setStatus('Error initiating connection');
    }
  }, [connectWebSocket, createPeerConnection, sendMessage]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current?.close();
      socketRef.current?.close();
    };
  }, [connectWebSocket]);

  return (
    <div>
      <button onClick={() => sendMessage({ type: 'senderReady' })}>
        Start Sending
      </button>
      <p>Status: {status}</p>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '320px', height: '240px' }}
      />
    </div>
  );
}
