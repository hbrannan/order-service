var express = require('express');
var utils = require('./utils.js');
var path = require('path');

var app = express();
express.static(path.join(__dirname, 'client'))


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/enrollments', function (req, res) {
  console.log('enrollments Hit')
  res.send(utils.getEnrollments());
});

app.get('/user', function (req, res) {
  console.log('user hit');
  var data = {
    'first_name' : 'ServerSite',
    'last_name' : 'Test',
    'password' : '123456',
    'email' : '222hannahbrannan@gmail.com'
  };

  res.send(utils.createUser(data));
});

app.get('/favicon.ico', function (req, res) {
  res.send('favicon not found');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
