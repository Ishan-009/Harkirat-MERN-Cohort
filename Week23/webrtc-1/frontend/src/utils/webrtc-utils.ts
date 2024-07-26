// webrtc-utils.ts

export const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  // Add TURN servers here
];

export const WEBSOCKET_URL = 'ws://localhost:8080';
export const HEARTBEAT_INTERVAL = 5000; // 5 seconds
export const HEARTBEAT_TIMEOUT = 15000; // 15 seconds

export function sendMessage(socket: WebSocket | null, message: object) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open. Unable to send message.');
  }
}
