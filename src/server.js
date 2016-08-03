var express = require('express');

var startServer = function (port) {
  var app = express();

  app.get('/', function (req, res) {
    res.status(200).send({status: 'ok'});
  });

  var server = app.listen(port, function () {
    console.log('Server listening on port %s', port);
  });

  return server;
}

module.exports = startServer;
