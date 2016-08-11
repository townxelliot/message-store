var dbSetup = require('./db');
var startServer = require('./server');
var Promise = require('bluebird');

/**
 * Start the message-store app on hostname:port
 *
 * @param {string} dbConfigFilePath - Path to the JSON configuration file
 * for the database; see README.md
 * @param {string} hostname - Host to run the app on
 * @param {integer} port - HTTP port to run the app on
 *
 * @returns {Promise} - Resolves to the Express Application once the server
 * has started
 */
var startApp = function (dbConfigFilePath, hostname, port) {
  return dbSetup(dbConfigFilePath).then(function (models) {
    return startServer(hostname, port, models);
  });
};

module.exports = startApp;
