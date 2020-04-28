const pool = 'postgres://naveen:1234@localhost:5432/naveen';
const {Client} = require('pg');
const client = new Client({
  connectionString: pool
});

client.connect()

var sql = 'select * from products';

client.query(sql).then(res => {
//   console.log('all data'+res.rows[0]);
  const data = res.rows;
  data.forEach(row => {
    console.log('Id: '+row.p_id+' Name: '+row.p_name);
    // console.log(row.p_id);
  })
  client.end()
});

// sql = 'insert into names(name) values ($1)';
//
// client.query(sql,['t']).then(res => {
//   console.log('data inserted');
//   client.end()
// });

// client.query('INSERT into names (name) VALUES($1)', ['title']).then(res => {
//   console.log('data inserted');
//   client.end()
// });

// module.exports{
//   client
// }
