/* Defines route data & behavior
TODO:
Promisify controller
---------------------------------------------------*/

var model = require('./model');
var utils = require('./utils');
var Promise = require('bluebird'); //use or loose this

module.exports = {
  order: {
    get: function (req, res) {
      return new Promise(function (resolve, reject) {
        model.Order.find(function (err, orders) {
          if (err) return reject(err);
          return resolve(orders)
        });
      })
      .then (function (orders) {
        res.send(orders);
      })
      .catch(function (err) {
        console.error('err', err);
        res.send('ERROR', err);
      });
    },
    post: function (req, res) {
      console.log('queryIz', req.query);
      var entry = req.query;

      return new Promise(function(resolve, reject) {
        var order = new model.Order({
          status:'order-placed',
          name: entry.name,
          address: entry.address,
          quantity: entry.quantity,
          material: entry.material,
          dimension: entry.dimension,
          shipping_service: entry.shippingOption,
          shipping_price: 300,
          unit_price: 300,
          subtotal_price: 300,
          tax: 300,
          total: 300,
          mfgName: 'null'
        });

        order.save()
        .then (function (data) {
          console.log(data, 'order iz');
          res.send(data);
        })
        .catch(function (err) {
          console.error('err', err);
          res.send('ERROR', err);
        });
      })

      //TODO:  Save it to heroku-persisted database
    }
  },

  orderProcessed: {
    put: function (req, res) {
      res.send('todo: update status');
      //order-placed -> order-processed
    }
  },

  orderClaimed: {
    put: function (req, res) {
      res.send('todo: specify mfgName');
      //order-placed -> order-claimed ?
    }
  },

  user: {
    get: function (req, res) {
      res.send('TODO: get list of users');
    },
    put: function (req, res) {
      res.send('TODO: update user info');
    },
    post: function (req, res) {
      res.send('TODO: add new user');
    }
  }
};
