const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080

const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be very secure',
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: 'https://dev-499441.okta.com/oauth2/default',
  client_id: '0oaaugodggWag7FyI4x6',
  client_secret: 'jSNnMbtXfZBk7R84uelidexf1QMs-jEzA7Ymi4OJ',
  redirect_uri: 'http://localhost:8080/authorization-code/callback',
  scope: 'openid profile'
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);


app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  if (req.userContext) {
    var name = req.userContext.userinfo.name;
    console.log("user in userPage")
    res.render('userPage',{
      name : name
    });
  } else {
    console.log("user in welcomePage")
    res.render('welcomePage');
  }
});

app.get('/logout',(req, res) => {
  console.log("user in welcomePage")
  res.render('welcomePage');
});

// app.get('/authorization-code/callback',(req,res) => {
//   console.log("call back page")
//   res.send('login');
// });

oidc.on('ready', () => {
  app.listen(8080, () => console.log(`Started!`));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
