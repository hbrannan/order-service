var express = require('express');
var utils = require('./utils.js');
var path = require('path');
var port = process.env.PORT || 5000;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var app = express();
app.use(allowCrossDomain);
express.static(path.join(__dirname, 'client'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/enrollments', function (req, res) {
  utils.getEnrollments(res);
});

app.get('/user', function (req, res) {
  console.log(req);
  if (req.data || req.body){
    console.log('req got it');
    utils.createUser(data, res);
  } else {
    var data = {
      'first_name' : 'ServerSite',
      'last_name' : 'Test',
      'password' : '123456',
      'email' : '222hannahbrannan@gmail.com'
    };
    utils.createUser(data, res);
  }
});

app.get('/favicon.ico', function (req, res) {
  res.send('favicon not found');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
