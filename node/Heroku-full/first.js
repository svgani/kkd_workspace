const path = require('path');
const express = require('express');
const hbs = require('hbs');
var favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');
var fun = require('./functionmod');
var db = require('./database');
const socket = require('socket.io');
const PORT = process.env.PORT || 8000

app.use(favicon(path.join(__dirname, 'views', 'circled-g.png')))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
// app.engine('hbs', engines.handlebars);
// app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  console.log("user in welcomePage")
  res.render('welcomePage');
});

app.get('/rules',(req,res) => {
  console.log("user in rulesPage")
  res.render('rules');
});

app.post('/',db.putName);
app.post('/:u_id/game',db.putDigits);
app.post('/:u_id/exec',db.guessNO);

var server = app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})

var io = socket(server);
var rooms=[];
io.on('connection', (socket) => {
  socket.on('number', (data) => {
    console.log("socket Connected number :"+data);
  })
});
