const pool = 'postgres://naveen:1234@localhost:5432/naveen';
const {Client} = require('pg');
const client = new Client({
  connectionString: pool
});

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'naveen',
//   host: 'localhost',
//   database: 'naveen',
//   password: '1234',
//   port: 5432
// })
var fun = require('./functionmod');
// const client = new pg.Client(cs);
client.connect();

function generateUid() {
  var ts = Date.now();
  ts = String(ts);
  li = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var ran = [];
  var nd = ts.length
  for(var i=0;i<5;i++){
    var a = Math.round(Math.random() * Math.pow(10,nd))
    a = a % li.length
    ran = ran + li[a]
  }
  console.log('USR'+ts.slice(0,7)+ran+ts.slice(7,nd));
  return ('USR'+ts.slice(0,7)+ran+ts.slice(7,nd));
}

const putName = (req,res) => {
  if (req.body.name=="") {
    res.render('welcomePage',{
      text : "Name is required"
    });
  } else {
    console.log("in putName function name is "+req.body.name);
    u_id = generateUid();
    client.query('insert into cowbull (uid, name) values ($1, $2)',[u_id,req.body.name])
    console.log("inserted");
    res.redirect('/'+u_id);
  }
}

const getName = (req,res) => {
  console.log("in getName function u_id is "+req.params.u_id)
  client.query('select name from cowbull where uid=$1',[req.params.u_id]).then(result => {
    var name=''
    console.log(result.rows);
    const data = result.rows;
    data.forEach(row => {
      console.log('Name: '+row.name);
      name=row.name
    })
    console.log(name);
    res.render('userPage',{
      name : name,
      uid : req.params.u_id
    });
  })
}

const putDigits = (req,res) => {
  if ( Number(req.body.nd) > 10 || Number(req.body.nd) < 1) {
    client.query('select name from cowbull where uid=$1',[req.params.u_id]).then(result => {
      var name=''
      console.log(result.rows);
      const data = result.rows;
      data.forEach(row => {
        console.log('Name: '+row.name);
        name=row.name
      })
      res.render('userPage',{
        text : "enter correct value",
        name : name,
        uid : req.params.u_id
      });
    })
  }
  else {
    console.log("in putDigits function digits are "+req.body.nd);
    client.query('update cowbull set digits = ($1)  where uid = ($2)',[req.body.nd,req.params.u_id])
    console.log("inserted digits");
    res.render('gamePage',{
      digit: req.body.nd,
      uid: req.params.u_id
    })
    var a = fun.aNum(req.body.nd)
    client.query('update cowbull set randomno = ($1)  where uid = ($2)',[a,req.params.u_id])
  }
}

const guessNO = (req,res) => {
  //get digit and list array
  client.query('select digits,result,randomno from cowbull where uid=$1',[req.params.u_id]).then(result => {
    var nd=0,a=0,list=[]
    const data = result.rows;
    data.forEach(row => {
      console.log('digit: '+row.digits+' random no: '+row.randomno+' result: '+row.result);
      nd=row.digits;
      a=row.randomno;
      list=row.result;
    })

  if ( (req.body.number).length!=nd ){
    console.log("count: "+(req.body.number).length);
    res.render('gamePage',{
      digit : nd,
      text : "enter the "+nd+" digit number",
      list : list,
      uid: req.params.u_id
    });
  }
  else if (fun.bRep(req.body.number,nd)) {
    console.log("repetitions in input occured");
    res.render('gamePage',{
      digit : nd,
      text : "enter the "+nd+" digit number without repetitions",
      list : list,
      uid: req.params.u_id
    });
  }
  else if (req.body.number[0]=='0') {
    console.log("zero in input occured");
    res.render('gamePage',{
      digit : nd,
      text : "enter the "+nd+" digit number not starting with 0",
      list : list,
      uid: req.params.u_id
    });
  }
  else {
    arr = fun.bNum(a,req.body.number,nd);
    console.log(arr);
    arr=arr+list
    client.query('update cowbull set result = {$1} where uid = ($2)',[arr,req.params.u_id])
    console.log(list);
    if (arr[2]!=nd){
      res.render('gamePage',{
        digit : nd,
        list : list,
        uid: req.params.u_id
      });
    }
    else {
      res.render("end",{
        digit : nd,
        // len : (list).length,
        list : list
      });
    }
    console.log(list);
  }
  })
}

module.exports = {
  putName,
  getName,
  putDigits,
  guessNO
}
