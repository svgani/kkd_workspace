//const DB_URL='postgres://scrylikgcehbnv:e16146437c6e35b5771d5bc0bb7b906ddaf4f24eeb4266fe429397beb6c128bd@ec2-52-201-55-4.compute-1.amazonaws.com:5432/d878dv2pf3scaj';
// const DB_URL=$(heroku config:get DATABASE_URL -a node-gani) your_process
//const pool = process.env.NODE_ENV=='production'?DB_URL:'postgres://naveen:1234@localhost:5432/naveen';
const pool = process.env.NODE_ENV=='production'?process.env.DATABASE_URL:'postgres://naveen:1234@localhost:5432/naveen';
//DATABASE_URL=$(heroku config:get DATABASE_URL -a node-gani) your_process;
//console.log(DATABASE_URL)
//const pool = 'postgres://naveen:1234@localhost:5432/naveen';

console.log('dburl:'+pool);
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
  console.log('G'+ts.slice(0,7)+'A'+ran+'N'+ts.slice(7,nd)+'I');
  return ('G'+ts.slice(0,7)+'A'+ran+'N'+ts.slice(7,nd)+'I');
}

const putName = (req,res) => {
  if (req.body.name=="" || req.body.name[0]==" ") {
    res.render('welcomePage',{
      text : "Name is required"
    });
  } else {
    console.log("in putName function name is "+req.body.name);
    u_id = generateUid();
    client.query('insert into cowbull (uid, name, digits, chances, result) values ($1, $2, $3, $4, $5)',[u_id,req.body.name,0,0,''])
    client.query('update cowbull set time = timeofday() where uid = ($1)',[u_id])
    console.log("inserted");
    res.render('userPage',{
      name : req.body.name,
      uid : u_id
    });
  }
}

// const getName = (req,res) => {
//   console.log("in getName function u_id is "+req.params.u_id)
//   client.query('select name from cowbull where uid=$1',[req.params.u_id]).then(result => {
//     var name='0'
//     const data = result.rows;
//     data.forEach(row => {
//       console.log('Name: '+row.name);
//       name=String(row.name)
//       console.log(result.rows);
//     })
//     if (name[0]=='0'){
//       console.log("in if part "+name);
//         res.redirect('/')
//     }
//     else {
//       console.log("in else part "+name);
//       client.query('update cowbull set result = ($1) where uid = ($2)',['_',req.params.u_id])
//       res.render('userPage',{
//         name : name,
//         uid : req.params.u_id
//       });
//     }
//   })
// }

const putDigits = (req,res) => {
  if ( Number(req.body.nd) > 9 || Number(req.body.nd) < 1) {
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
    client.query('update cowbull set result = ($1)  where uid = ($2)',['',req.params.u_id])
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
    var nd=0,a=0,list=''
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
      list : fun.toList(list,list.length/(nd+2),nd),
      len : list.length/(nd+2),
      uid: req.params.u_id
    });
  }
  else if (fun.bRep(req.body.number,nd)) {
    console.log("repetitions in input occured");
    res.render('gamePage',{
      digit : nd,
      text : "enter the "+nd+" digit number without repetitions",
      list : fun.toList(list,list.length/(nd+2),nd),
      len : list.length/(nd+2),
      uid: req.params.u_id
    });
  }
  else if (req.body.number[0]=='0') {
    console.log("zero in input occured");
    res.render('gamePage',{
      digit : nd,
      text : "enter the "+nd+" digit number not starting with 0",
      list : fun.toList(list,list.length/(nd+2),nd),
      len : list.length/(nd+2),
      uid: req.params.u_id
    });
  }
  else {
    arr = fun.bNum(a,req.body.number,nd);
    console.log(arr);
    list=arr+list
    client.query('update cowbull set result = ($1) where uid = ($2)',[list,req.params.u_id])
    console.log(list);
    if (arr[nd+1]!=nd){
      console.log("list length "+list.length);
      res.render('gamePage',{
        digit : nd,
        list : fun.toList(list,list.length/(nd+2),nd),
        len : list.length/(nd+2),
        uid: req.params.u_id
      });
    }
    else {
      res.render("end",{
        digit : nd,
        len : list.length/(nd+2),
        list : fun.toList(list,list.length/(nd+2),nd)
      });
      console.log("list length "+list.length);
      client.query('update cowbull set chances = ($1) where uid = ($2)',[list.length/(nd+2),req.params.u_id])
    }
    console.log(list);
  }
  })
}

module.exports = {
  putName,
  putDigits,
  guessNO
}
