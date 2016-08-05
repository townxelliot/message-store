// database model definitions

var Sequelize = require('sequelize');

/**
 * Create models which map to database tables.
 *
 * Note that the database tables are defined in the migrations/ directory.
 * Any mappings of those tables to Sequelize model classes should be done here.
 *
 * @param {Sequelize} conn - Sequelize instance configured for a database
 *
 * @returns {dictionary} - The returned dictionary has this form
 * {
 *   'modelName': <Sequelize model class>,
 *   ...
 * }
 */
var createModels = function (conn) {
  var models = {};

  // message: maps to messages table
  models.Message = conn.define('message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return models;
};

module.exports = createModels;
