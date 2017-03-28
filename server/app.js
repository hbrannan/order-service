var express = require('express');
var utils = require('./utils.js');
var path = require('path');
var port = process.env.PORT || 5000;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
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

app.get('/orders', function (req, res) {
  // utils.getEnrollments(res);
  res.send('todo: send back an unstyled list of orders with status: order-placed');
});

app.post('/orders', function (req, res) {
  // utils.getEnrollments(res);
  res.send('todo: post a new order with form submission instantiating model');
});

app.put('/claim-order', function (req, res) {
  // utils.getEnrollments(res);
  res.send('todo: assign merchant');
});

app.put('/order-processed', function (req, res) {
  // utils.getEnrollments(res);
  res.send('todo: assign merchant');
  // status -> "order-claimed"
  // mfgName -> req.body.XX.merchantName
});

app.get('/user', function (req, res) {
    res.send('todo');
  // if (req.query){
  //   utils.createUser(req.query, res);
  // } else {
  //   res.send('error with user data');
  // }
});

app.get('/favicon.ico', function (req, res) {
  res.send('screw the favicon already');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
