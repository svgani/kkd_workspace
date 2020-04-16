var http = require('http');
var dt = require('./date');

console.log('open 127.0.0.1:8080 in browser.');
console.log('Hello...');
setTimeout(function() {
  console.log('World!');
}, 2000);
console.log(dt.sum(1,2));

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('time and date : '+dt.myDateTime());
  res.write('\nHello World!');
  res.write('\n'+req.url);
  res.end();
}).listen(8080);
