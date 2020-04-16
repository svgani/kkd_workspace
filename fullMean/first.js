const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
var dt = require('./date');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  // res.send('Welcome to express');
  res.render('index',{
    name : "Express "
  });
});

app.get('/post',(req,res) => {
  // res.send('Welcome to express');
  res.render('form');
});

app.post('/post',(req,res) => {
  res.render('index',{
    name : dt.sum(req.body.a,req.body.b)
  });
});

app.get('/about',(req,res) => {
  res.send('This is about page.');
});

app.listen(5000,() => {
  console.log('Server is running at port 5000');
})
