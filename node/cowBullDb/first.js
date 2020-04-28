const path = require('path');
const express = require('express');
const hbs = require('hbs');
var favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');
var fun = require('./functionmod');
var db = require('./database');
const PORT = process.env.PORT || 8080

app.use(favicon(path.join(__dirname, 'views', 'circled-g.png')))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
// app.engine('hbs', engines.handlebars);
// app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// hbs.registerHelper('toList', function(list, chances, digit, block) {
//   var updatedList = [];
//   console.log("chances : "+chances+" digits : "+digit);
//   for(var i = 0; i < chances; i++) {
//     var a=i*(digit+2);
//     var b=(i+1)*(digit+2);
//     console.log("a : "+a+" b : "+b);
//     var t=list.slice(a,b);
//     console.log(t)
//     var s=[]
//     s.push(t.slice(0,digit),t.slice(digit,digit+1),t.slice(digit+1,digit+2))
//     updatedList.push(s);
//   }
//   return updatedList
// });

app.get('/.well-known/acme-challenge/io7fUjAxeDpARO2E8h3BZFsa-TENbF7qYCRVA_WPGoE',(req,res) => {
  console.log("cert acquires")
  res.send('io7fUjAxeDpARO2E8h3BZFsa-TENbF7qYCRVA_WPGoE.j7XOJu7t3MmztfmTduaiw6Zjy3IHBVp1J_R9_pXlkDA');
});

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

app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})
