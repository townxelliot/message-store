// database connection configuration and setup

var nconf = require('nconf');
var Sequelize = require('sequelize');

// SQLite dialect is the default
var SQLITE_DIALECT = 'sqlite';

// dialects available to Sequelize
var DIALECTS = [SQLITE_DIALECT, 'mysql', 'mssql', 'postgres'];

// string for storage option, to set up SQLite in memory
var IN_MEMORY_STORAGE = ':memory:';

// default settings for the Sequelize pool
var DEFAULT_POOL = {
  max: 5,
  min: 0,
  idle: 10000
};

/**
 * Configure and return a Sequelize instance;
 * the configuration file format is shown in the README.
 *
 * @param {string} configFilePath - Path to JSON configuration file to load
 * db configuration from
 *
 * @returns {Sequelize} - Configured Sequelize instance
 */
var getConnection = function (configFilePath) {
  // configure from command line, then from env
  nconf.argv().env();

  // configure from file if supplied
  if (configFilePath) {
    nconf.file({file: configFilePath});
  }

  // default to in-memory sqlite
  nconf.defaults({
    dialect: SQLITE_DIALECT,
    storage: IN_MEMORY_STORAGE,
    pool: DEFAULT_POOL
  });

  // check dialect is valid
  var dialect = nconf.get('dialect');
  if (DIALECTS.indexOf(dialect) === -1) {
    throw new Error('specified dialect ' + dialect + ' is not available; ' +
      'please specify one of ' + JSON.stringify(DIALECTS));
  }

  // check required options
  if (dialect === SQLITE_DIALECT) {
    nconf.required(['storage']);
  }
  else {
    nconf.required(['database', 'username', 'password']);
    if (!(nconf.get('host') || nconf.get('socketPath'))) {
      throw new Error('host (or host or socketPath for MySQL) must be ' +
        'specified');
    }
  }

  // config ok, so set up the connection
  var database = nconf.get('database');
  var username = nconf.get('username');
  var password = nconf.get('password');
  var config = nconf.get();

  return new Sequelize(database, username, password, config);
};

module.exports = getConnection;
