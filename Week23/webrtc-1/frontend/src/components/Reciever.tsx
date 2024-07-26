import { useCallback, useEffect, useRef, useState } from 'react';

const WEBSOCKET_URL = 'ws://localhost:8080';

export default function Receiver() {
  const [status, setStatus] = useState<string>('Not connected');
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        console.log(
          'Receiver: Connection established. Checking for incoming tracks...'
        );
      }
    };

    pc.ontrack = (event) => {
      console.log(`Receiver: Received ${event.track.kind} track`);
      if (event.streams && event.streams[0]) {
        setVideoStream(event.streams[0]);
        setStatus('Video stream received');
      } else {
        console.warn('No stream available in the track event');
        setStatus('No stream available in track event');
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
      sendMessage({ type: 'receiver' });
      sendMessage({ type: 'receiverReady' });
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      switch (message.type) {
        case 'createOffer':
          console.log('Offer received');
          try {
            const pc = createPeerConnection();
            await pc.setRemoteDescription(
              new RTCSessionDescription(message.sdp)
            );
            console.log('Remote description set');
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            sendMessage({ type: 'createAnswer', sdp: pc.localDescription });
            console.log('Answer sent');
            setStatus('Answer sent');
          } catch (error) {
            console.error('Error handling offer:', error);
            setStatus('Error handling offer');
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
        case 'senderReady':
          console.log('Sender is ready. Sending receiverReady message...');
          sendMessage({ type: 'receiverReady' });
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
  }, [createPeerConnection, sendMessage]);

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

  useEffect(() => {
    connectWebSocket();
    return () => {
      peerConnectionRef.current?.close();
      socketRef.current?.close();
    };
  }, [connectWebSocket]);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.error('Error playing video:', e));
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        playsInline
        style={{ width: '100%', maxWidth: '640px' }}
        onLoadedMetadata={() => console.log('Video metadata loaded')}
      />
      <button onClick={handlePlayVideo}>Play Video</button>
      <p>Status: {status}</p>
    </div>
  );
}
