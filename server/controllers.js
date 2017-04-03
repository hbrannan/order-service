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
      console.log('POSTING NEW queryIz', req.query);
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
      console.log('orderProcessed queryIz', req.query, req.query._id);
      var query = {_id:req.query._id};
      var status = {status:'order-processed'};

      return new Promise(function(resolve, reject) {
        //order-placed -> order-processed
        model.Order.update(query, status, {'upsert':false}, function (err, doc) {
          if (err) {
            res.send('UPDATE ERROR: ', err);
          } else {
            res.send(doc);
          }
        })
      })
    }
  },

  orderClaimed: {
    put: function (req, res) {
      console.log('claimedOrder queryIz', req.query, req.query._id);
      let reqData = JSON.parse(query.order)
      let orderId = reqData._id;
      let claimingMerchant = query.merchantName || 'testName';
      let query = {_id:req.query._id};
      let status = {status:'order-claimed', mfgName: claimingMerchant};

      return new Promise(function(resolve, reject) {
        //order-placed -> order-processed
        model.Order.update(query, status, {'upsert':false}, function (err, doc) {
          if (err) {
            res.send('UPDATE ERROR: ', err);
          } else {
            res.send(doc);
          }
        })
      })
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
