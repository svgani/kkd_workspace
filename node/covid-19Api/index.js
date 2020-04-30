const express = require('express');
const app = express();
const path = require('path');
const request = require("request");
const hbs = require('hbs');
const bodyParser = require('body-parser');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
  res.redirect('/state/Karnataka');
})

app.get('/:err',(req,res) => {
  res.redirect('/state/Karnataka');
})

app.get('/state/:state',(req,res) => {
  var msg=''
  request.get('https://api.rootnet.in/covid19-in/stats/latest',(error, response, body) => {
    msg = JSON.parse(body);
    console.log(req.params.state);
    var i = fetchStateNumber(msg.data.regional,req.params.state);
    console.log("i = "+i);
    console.log(msg.data.summary);
    var states = fetchStates(msg.data.regional);
    console.log(msg.data.regional[i]);
    res.render('first',{
      iConf: msg.data.summary.total,
      iDis: msg.data.summary.discharged,
      iDeaths: msg.data.summary.deaths,
      state: req.params.state,
      sConf: msg.data.regional[i].totalConfirmed,
      sDis: msg.data.regional[i].discharged,
      sDeaths: msg.data.regional[i].deaths,
      states: states
    })
  })
})

app.listen(8000,() => {
  console.log("port:"+8000);
})

function fetchStateNumber(arr,state) {
  var i;
  for (i=0;i<arr.length;i++) {
    if (arr[i].loc == state){
      break;
    }
  }
  return i;
}

function fetchStates(arr) {
  var states=[];
  for (i=0;i<arr.length;i++) {
    states.push([arr[i].loc])
  }
  return states;
}
