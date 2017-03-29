/* Defines `Order` schema and model

TODOs:
--Include users, manufacturers
--As expand schemas/models, move ea. into sep. folder
*/
var db = require('./db-connection');

// Order Schema and Model
var OrderSchema = new db.mongoose.Schema({
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

var Order = db.mongoose.model('Order', OrderSchema);

module.exports = {
  Order: Order
}
