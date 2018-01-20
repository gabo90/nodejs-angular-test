'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var Address = sequelize.define('Address', {
    nombre:  { type: DataTypes.STRING, allowNull: false },
    direccion:  { type: DataTypes.TEXT, allowNull: false }
  },
  {
    underscored: true,
    classMethods: {
        associate: function(models) {
          Address.belongsTo(models.User);
        }
    }
  });
  return Address;
};