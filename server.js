const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Emit message to all connected clients
  socket.on('message', (msg) => {
    io.emit('message', { text: msg, id: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(8080, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:8080');
});
