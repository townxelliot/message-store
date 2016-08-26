'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // create "messages" table
    queryInterface.createTable(
      'messages',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    // drop "message" table
    queryInterface.dropTable('messages');
  }
};
