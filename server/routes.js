/* Modularizes order-service app routs
---------------------------------------------------*/

var utils = require('./controllers');
var router = require('express').Router();

router.get('/order', utils.order.get);

router.post('/order', utils.order.post);

router.put('/order-processed', utils.orderProcessed.put);

router.get('/user', utils.user.get);

module.exports = router;
