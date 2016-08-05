var startApp = require('../src/app.js');

// TODO move to config
var HOSTNAME = '0.0.0.0';

// TODO move to config
var PORT = 3000;

// pass database config file path to startApp
var DB_CONFIG = process.env.MESSAGE_STORE_DB_CONFIG || null;

startApp(DB_CONFIG, HOSTNAME, PORT)
.then(function () {
  console.log('******* Server listening at http://%s:%s', HOSTNAME, PORT);
});
