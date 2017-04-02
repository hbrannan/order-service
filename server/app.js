/* Creates Node/Express server

TODOS:
    connect with mongo mongodb://heroku_7d2ng1k6:npml1vn2mug7tb6ekqn992j1iv@ds143900.mlab.com:43900/heroku_7d2ng1k6
    restrict access headers
    favicon to serve lit. anything else

---------------------------------------------------*/

var express = require('express');
var port = process.env.PORT || 5000;

//Middleware
var router = require('./routes');
var path = require('path');

var CORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
};

//Create application; Serve client files
var app = express();
app.use(CORS);
express.static(path.join(__dirname, 'client'));

//Define service-specific (sub)routes
app.use('/orders-data', router);

//Define standard routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/favicon.ico', function (req, res) {
  res.send('screw the favicon already');
});

//Return HTTP server instance
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

//Expose Express
module.exports.app = app;
