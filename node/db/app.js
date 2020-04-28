const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('hbs');
const db = require('./dbfun')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  console.log("user in First page @ "+Date.now());
  res.render('first');
});

// app.get('/name/:name',db.putName)

app.get('/name/:name',db.putName,(req,res) => {
  console.log("user in First page with name @ "+Date.now());
  res.render('first',{
    name: req.params.name
  });
  console.log("name = "+req.params.name);

  console.log("name inserted");
});

app.listen(8000,() => {
  console.log('Server is running at port 8000');
});
