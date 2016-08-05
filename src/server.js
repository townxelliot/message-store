var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var MessagesRouter = require('./routes/messages');
var Promise = require('bluebird');

/**
 * Start the application server and configure routes.
 *
 * @param {string} hostname - Hostname to run server on
 * @param {integer} port - HTTP port to use
 * @param {dictionary} models - Sequelize model classes mapped to model names
 *
 * @returns {Promise} - Promise which resolves to an http.Server object
 * once the server has started
 */
var startServer = function (hostname, port, models) {
  var app = express();

  // parse all POST bodies, regardless of content type, as strings
  app.use(bodyParser.text({type: '*/*'}));

  // construct router for /messages URLs
  var messagesRouter = MessagesRouter(models);

  // map URLs to router(s)

  // GET a specified message
  app.get('/messages/:messageId', messagesRouter.getMessage);

  // POST a new message
  app.post('/messages', messagesRouter.postMessage);

  // use the http module here so that we can get a handle to an object with
  // the close() method (an Express Application doesn't have a close()...)
  var httpServer = http.createServer(app);

  // make http.listen() return a promise
  return new Promise(function(resolve, reject) {
    httpServer.listen(port, hostname, function () {
      resolve(httpServer);
    });
  });
};

module.exports = startServer;
