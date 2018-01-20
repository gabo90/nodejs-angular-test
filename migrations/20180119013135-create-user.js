'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password:  {
        type: Sequelize.STRING,
        allowNull: false 
      },
      nombre:  {
        type: Sequelize.STRING,
        allowNull: false 
      },
      apellidos:  {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_type: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};