var socket = io();
socket.on('message', function (data) {
  document.body.innerHTML = '';
  document.write(data)
})
socket.emit('reply', "");
