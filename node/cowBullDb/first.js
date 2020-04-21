const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
var fun = require('./functionmod');
var db = require('./database');
const PORT = process.env.PORT || 8080


app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
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
app.get('/:u_id',db.getName);
app.post('/:u_id/game',db.putDigits);
app.post('/:u_id/exec',db.guessNO);

app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})
