const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the built frontend files
app.use(express.static(path.join(__dirname, 'public'))); // Change to 'dist' if using React/Vue

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change to 'dist/index.html' for React/Vue
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    io.emit('message', { text: msg, id: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
