/* Modularizes order-service app routes
all of the rollowing router routes are subroutes of
/orders-data
---------------------------------------------------*/

var controllers = require('./controllers');
var router = require('express').Router();


router.get('/order', controllers.order.get);

router.post('/order', controllers.order.post);

router.put('/order-processed', controllers.orderProcessed.put);

router.put('/order-claimed', controllers.orderClaimed.put);

router.get('/user', controllers.user.get);

module.exports = router;
