import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('Server A: New client connected');

  ws.on('message', (message: string) => {
    console.log('Server A: Received message:', message);
    wss.clients.forEach((client: WebSocket) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Server A: Client disconnected');
  });
});
