const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('stream', (data) => {
    socket.broadcast.emit('stream', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 7000;
http.listen(PORT, () => {
  console.log(`Streaming client server running on port ${PORT}`);
});