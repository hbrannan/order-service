var express = require('express');
var utils = require('./utils.js');
var path = require('path');
var promise = require('bluebird');
var port = process.env.PORT || 5000;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/order-service');


// Create a schema
var OrderSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  status: String,
  name: String,
  address: String,
  quantity: Number,
  shipping_service: String,
  shipping_price: Number,
  unit_price: Number,
  subtotal: Number,
  tax: Number,
  total: Number,
  mfgName: String
});

// Create a model based on the schema
var Order = mongoose.model('Order', OrderSchema);

// Find all data in the Todo collection
Order.find(function (err, orders) {
  if (err) return console.error(err);
  console.log('found: ',orders)
});

/*TODOS:
       connect with mongo mongodb://heroku_7d2ng1k6:npml1vn2mug7tb6ekqn992j1iv@ds143900.mlab.com:43900/heroku_7d2ng1k6
       restrict access via headers
       throttle routes
       possibly refactor favicon serve to something professional
*/
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
  console.log('in /orders')
  // utils.getEnrollments(res);
  // Create a todo in memory
  var order = new Order({
    status:"order-placed",
    name: 'Getting there...',
    address: 'Getting there..',
    quantity: 250,
    shipping_service: 'Ground',
    shipping_price: 300,
    unit_price: 300,
    subtotal_price: 300,
    tax: 300,
    total: 300,
    mfgName: 'null'
  });

  // Save it to database
  order.save(function(err){
    if(err)
      console.log(err);
    else
      console.log('saved: ',order);
  });
  res.send('todo: send back an unstyled list of orders with status: order-placed');
});

app.post('/orders', function (req, res) {
  res.send('todo: post a new order with form submission instantiating model', order);
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
