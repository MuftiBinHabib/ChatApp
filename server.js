const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(express.json()); // Enable JSON parsing for future API use

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (msg) => {
    io.emit('message', { text: msg, id: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  io.close();
  server.close(() => process.exit(0));
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
