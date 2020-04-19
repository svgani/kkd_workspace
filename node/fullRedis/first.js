const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
var fun = require('./functions');
const PORT = process.env.PORT || 8080
var arr;

app.use(require("express-session")({
  name: 'cbGame',
  secret: 'nodegani1234',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV == "production" ? true : false ,
    maxAge: 1000 * 60 * 10
  }
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  console.log("user in welcomePage")
  console.log(req.session);
  res.render('welcomePage');
});

app.get('/rules',(req,res) => {
  console.log("user in rulesPage")
  res.render('rules');
});

app.post('/game',(req,res) => {
  //fun.lrender(req.session.list);
  console.log(req.session);
  req.session.nd=req.body.nd;
  if ( (req.session.nd) > 10 || (req.session.nd) < 1) {
      res.render('userPage',{
      text : "enter correct value",
      name :  req.session.name
    });
    console.log(req.session.nd);
  } else {
    res.render('gamePage',{
      digit : req.session.nd
    });
    // compute random Number
    req.session.aNum = fun.aNum(req.session.nd);
    req.session.list=[]
    console.log("random number : "+req.session.aNum );
  }
  console.log("digits_"+req.session.nd);
});

app.post('/exec',(req,res) => {
  console.log(req.session);
  req.session.number=req.body.number;
  console.log("no of digits in exec page "+req.session.nd);
  if (req.session.nd=='undefined'){
    console.log("Previous session expired");
    res.render('welcomePage',{
      text : "Previous session expired"
    });
  }
  else if ( (req.session.number).length!=req.session.nd ) {
    console.log("count: "+(req.session.number).length);
    res.render('gamePage',{
      digit : req.session.nd,
      text : "enter the "+req.session.nd+" digit number",
      list : req.session.list
    });
  }
  else if (fun.bRep(req.session.number,req.session.nd)) {
    console.log("repetitions in input occured");
    res.render('gamePage',{
      digit : req.session.nd,
      text : "enter the "+req.session.nd+" digit number without repetitions",
      list : req.session.list
    });
  }
  else if (req.session.number[0]=='0') {
    console.log("repetitions in input occured");
    res.render('gamePage',{
      digit : req.session.nd,
      text : "enter the "+req.session.nd+" digit number not starting with 0",
      list : req.session.list
    });
  }
  else {
    arr = fun.bNum(req.session.aNum,req.session.number,req.session.nd);
    req.session.list.push(arr);
    if (arr[2]!=req.session.nd){
      res.render('gamePage',{
        digit : req.session.nd,
        list : req.session.list
      });
    }
    else {
      res.render("end",{
        digit : req.session.nd,
        len : (req.session.list).length,
        list : req.session.list
      });
    }
    console.log((req.session.list).length);
    console.log(req.session);
  }
});

app.get('/exec',(req,res) => {
  console.log(req.session);
  console.log("get method in exec page")
  res.redirect("/");
});

app.post('/user',(req,res) => {
  console.log(req.session);
  req.session.name=fun.capital(req.body.name);
  if (req.session.name=="") {
    res.render('welcomePage',{
      text : "Name is required"
    });
  } else {
    res.render('userPage',{
      name : req.session.name
    });
    console.log("name_"+req.session.name);
  }
});

app.listen(PORT,() => {
  console.log('Server is running at port 8080');
})
