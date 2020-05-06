const express = require('express');
const app = express();
const socket = require('socket.io');

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/views/index.html');
});

var server = app.listen(8000, () => {
  console.log("Server Started port:8000");
});

var io = socket(server);
var connectedUsers = {};
var clients = 0;
io.on('connection', (socket) => {
  socket.on('create', (username) => {
    clients++;
    console.log('New User Connected : '+username);
    socket.username = username;
    socket.broadcast.emit('new_client', username);
    console.log("clients "+clients);
  });
  // io.to(connectedUsers[username].id).emit('message', 'clients '+clients);
  // socket.on('reply', (data) => {
  //   console.log(data+": clients "+clients);
  // });
  socket.on('message', (message) => {
    // console.log('User Disconnected');
    socket.broadcast.emit('message', {username: socket.username, message: message});
  });
  socket.on('disconnect', () => {
    console.log('User Disconnected');
    clients--;
    console.log("clients "+clients);
  });
});

// 21,27,32,33,34,38,46,47,51,52,53,55
