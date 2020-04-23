const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { Client } = require('pg')
const client = new Client()
const app = express();
const bodyParser = require('body-parser');
var fun = require('./functionmod');
const PORT = process.env.PORT || 8080
var arr;
var list;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  console.log("user in welcomePage")
  res.render('welcomePage');
});

app.get('/rules',(req,res) => {
  console.log("user in rulesPage")
  res.render('rules');
});

app.post('/game',(req,res) => {
  if ( Number(req.body.nd) > 10 || Number(req.body.nd) < 1) {
      res.render('userPage',{
      text : "enter correct value",
      name : fun.getName()
    });
  } else {
    res.render('gamePage',{
      digit : fun.setDigit(req.body.nd)
    });
    // compute random Number
    fun.aNum();
    list=[];
  }
  console.log("digits_"+req.body.nd);
});

app.post('/exec',(req,res) => {
  if ( (req.body.number).length!=fun.getDigit() ) {
    console.log("count: "+(req.body.number).length);
    res.render('gamePage',{
      digit : fun.getDigit(),
      text : "enter the "+fun.getDigit()+" digit number",
      list : list
    });
  }
  else if (fun.bRep(req.body.number)) {
    console.log("repetitions in input occured");
    res.render('gamePage',{
      digit : fun.getDigit(),
      text : "enter the "+fun.getDigit()+" digit number without repetitions",
      list : list
    });
  }
  else if (req.body.number[0]=='0') {
    console.log("zero in input occured");
    res.render('gamePage',{
      digit : fun.getDigit(),
      text : "enter the "+fun.getDigit()+" digit number not starting with 0",
      list : list
    });
  }
  else {
    arr = fun.bNum(req.body.number);
    list.push(arr);
    if (arr[2]!=fun.getDigit()){
      res.render('gamePage',{
        digit : fun.getDigit(),
        list : list
      });
    }
    else {
      res.render("end",{
        digit : fun.getDigit(),
        len : (list).length,
        list : list
      });
    }
    console.log(list);
  }
});

app.post('/exec',(req,res) => {
  console.log("post method in exec page")
  res.redirect("/");
});

app.get('/exec',(req,res) => {
  console.log("get method in exec page")
  res.redirect("/");
});

app.post('/user',(req,res) => {
  if (req.body.name=="") {
    res.render('welcomePage',{
      text : "Name is required"
    });
  } else {
    res.render('userPage',{
      name : fun.setName(req.body.name)
    });
    console.log("name_"+req.body.name);
  }
});

app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})
