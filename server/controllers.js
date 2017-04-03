/* Defines route data & behavior
TODOs:
    -user routes
    -get order routes -> all orders/ available orders/ my-claimed-orders / my-processed-orders
---------------------------------------------------*/

var model = require('./model');
var utils = require('./utils');
var Promise = require('bluebird');

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
        res.send('Order retrieval ERROR', err);
      });

    },
    post: function (req, res) {

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

    }
  },

  orderProcessed: {

    put: function (req, res) {

      console.log('orderProcessed query', req.query);
      var query = {_id:req.query._id};
      var status = {status:'order-processed'};

      return new Promise(function(resolve, reject) {
        model.Order.update(query, status, {'upsert':false}, function (err, doc) {
          if (err) {
            res.send('Processing ERROR: ', err);
          } else {
            res.send(doc);
          }
        });
      });

    }
  },

  orderClaimed: {
    put: function (req, res) {

      console.log('claimedOrder name', req.query.name);
      let reqData = JSON.parse(req.query.order);
      let orderId = reqData._id;

      console.log('claimedOrder ID', orderId);
      let claimingMerchant = req.query.name || 'testName';
      let query = {_id : orderId};
      let update = {status: 'order-claimed', mfgName: claimingMerchant};

      return new Promise(function(resolve, reject) {
        model.Order.update(query, update, {'upsert':false}, function (err, doc) {
          if (err) {
            res.send('Claiming ERROR: ', err);
          } else {
            res.send(doc);
          }
        });
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
  }
};
