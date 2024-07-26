import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

function sendToSender(message: any) {
  if (senderSocket?.readyState === WebSocket.OPEN) {
    senderSocket.send(JSON.stringify(message));
  }
}

function sendToReceiver(message: any) {
  if (receiverSocket?.readyState === WebSocket.OPEN) {
    receiverSocket.send(JSON.stringify(message));
  }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    try {
      const message = JSON.parse(data);
      console.log('Received message:', message.type);

      switch (message.type) {
        case 'sender':
          senderSocket = ws;
          console.log('Sender connected');
          break;
        case 'receiver':
          receiverSocket = ws;
          console.log('Receiver connected');
          break;
        case 'senderReady':
          sendToReceiver({ type: 'senderReady' });
          break;
        case 'receiverReady':
          sendToSender({ type: 'receiverReady' });
          break;
        case 'createOffer':
          if (ws === senderSocket) {
            sendToReceiver({ type: 'createOffer', sdp: message.sdp });
          }
          break;
        case 'createAnswer':
          if (ws === receiverSocket) {
            sendToSender({ type: 'createAnswer', sdp: message.sdp });
          }
          break;
        case 'iceCandidate':
          if (ws === senderSocket) {
            sendToReceiver({
              type: 'iceCandidate',
              candidate: message.candidate,
            });
          } else if (ws === receiverSocket) {
            sendToSender({
              type: 'iceCandidate',
              candidate: message.candidate,
            });
          }
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', function close() {
    if (ws === senderSocket) {
      console.log('Sender disconnected');
      senderSocket = null;
    } else if (ws === receiverSocket) {
      console.log('Receiver disconnected');
      receiverSocket = null;
    }
  });
});

console.log('WebSocket server is running on port 8080');
