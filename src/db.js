// get a database connection and ensure migrations have been applied

var path = require('path');
var Promise = require('bluebird');
var Umzug = require('umzug');
var getConnection = require('./connection');
var createModels = require('./models');

// directory holding migration files
var migrationsDir = path.join(__dirname, '..', 'migrations');

/**
 * Apply migrations to the database connected to by conn.
 *
 * @param {Promise} - Resolves to the Sequelize connection, configured and
 * with migrations applied
 */
var applyMigrations = function (conn) {
  // configuration for Umzug so it can load Sequelize migrations;
  // see https://github.com/sequelize/umzug/issues/17#issuecomment-74652312
  var umzugConfig = {
    storage: 'sequelize',

    storageOptions: {
      sequelize: conn,
    },

    migrations: {
      params: [conn.getQueryInterface(), conn.constructor],
      path: migrationsDir,
      pattern: /\.js$/
    }
  };

  // apply any pending migrations
  var umzug = new Umzug(umzugConfig);

  return umzug.pending()
    .then(function (migrations) {
      var migrationPaths = migrations.map(function (migration) {
        return migration.file;
      });

      return umzug.execute({
        migrations: migrationPaths,
        method: 'up'
      });
    })
    .then(function () {
      return Promise.resolve(conn);
    });
};

/**
 * Set up database, apply migrations, and configure models.
 *
 * @param {string} configFilePath - Path to JSON configuration file to load
 * db configuration from
 *
 * @returns {Promise} - Resolves to a Models object, which provides references
 * to all the models available in the application
 */
var dbSetup = function (configFilePath) {
  var conn = getConnection(configFilePath);
  return applyMigrations(conn)
    .then(function (conn) {
      var models = createModels(conn);
      return Promise.resolve(models);
    });
};

module.exports = dbSetup;

