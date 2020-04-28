const Pool = require('pg').Pool
const pool = new Pool({
  user: 'naveen',
  host: 'localhost',
  database: 'naveen',
  password: '1234',
  port: 5432
})

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
    console.log(a+'is random number '+' random: '+ran);
  }
  return ('USR'+ts.slice(0,7)+ran+ts.slice(7,nd));
}

const putName = (req,res) => {
  const name = req.params.name
  u_id = generateUid();
  pool.query('insert into names (u_id, name) values ($1, $2)',[u_id,name])
  console.log("inserted");
  res.redirect('/');
}

module.exports = {
  putName
}
