/* Modularizes order-service app routes
all of the rollowing router routes are subroutes of
/orders-data
---------------------------------------------------*/

var utils = require('./controllers');
var router = require('express').Router();


router.get('/order', utils.order.get);

router.post('/order', utils.order.post);

router.put('/order-processed', utils.orderProcessed.put);

router.put('/order-created', utils.orderCreated.put);

router.get('/user', utils.user.get);

module.exports = router;
