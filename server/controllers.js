/* Defines route behavior
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
      //Create and save a new document
      var order = new model.Order({
        status:'order-placed',
        name: 'Truly being posted...',
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
          console.log('saved: ', order);
      });
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
  }
};
