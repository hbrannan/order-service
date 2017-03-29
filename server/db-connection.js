/* Connects to the DB
---------------------------------------------------*/
var mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI|| 'mongodb://localhost/order-service';

var connection = mongoose.connect(MONGODB_URI);
module.exports = {
  connection: connection,
  mongoose: mongoose
}
