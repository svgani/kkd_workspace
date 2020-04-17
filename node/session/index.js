const express = require('express'),
app = express();

app.use(require("express-session")({
  name: 'sessionDemo',
  secret: 'nodegani',
  resave: false,
  saveUninitialized: false
}));

app.get('/',(req,res) => {
  if (!req.session.a) {
    req.session.a = 0;
  }
  req.session.a += 1;
  res.json(req.session);
});

app.listen(8000,() => {
  console.log('port = 8000');
});
