const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
var fun = require('./functionmod');
const socket = require('socket.io');
const PORT = process.env.PORT || 8000

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.get('/',(req,res) => {
  console.log("user in welcomePage")
  res.render('welcomePage');
});

var server = app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})

var io = socket(server);
var rooms=[];
io.on('connection', (socket) => {
  socket.chances = 0;
  socket.on('name', (name) => {
    console.log("socket Connected name :"+name);
    socket.name=fun.caps(name);
    console.log("socket id : "+socket.id);
    console.log("socket name : "+socket.name);
    socket.emit('user', socket.name);
  })
  socket.on('digit', (data) => {
    // console.log("socket Connected name :"+data);
    socket.digit=data%11;
    socket.random=fun.rand(data);
    console.log("socket rand : "+socket.random);
    console.log("socket name : "+socket.name);
    socket.emit('game', socket.digit);
  })
  socket.on('number', (data) => {
    // console.log("socket Connected name :"+data);
    socket.number=data;
    // console.log(fun.bNum(socket.random,socket.number,socket.digit))
    // socket.emit('game', socket.digit);
    if (data.length!=socket.digit) {
      socket.emit('userIn', "Enter "+socket.digit+" digit number");
    }
    else if (fun.bRep(data,socket.digit)) {
      socket.emit('userIn', "Enter "+socket.digit+" digit number without repetition");
    }
    else {
      socket.chances++;
      var res = fun.bNum(socket.random,socket.number,socket.digit);
      if (res[2]==socket.digit) {
        console.log("game over");
        socket.emit('end', {
          chances: socket.chances,
          number: socket.digit
        });
      }
      else {
        socket.emit('userIn', res);
      }
    }
  })
  socket.on('disconnect', () => {
    console.log("BYE>>>>");
  })
});
