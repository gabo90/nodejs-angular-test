'use strict';
module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define('User', {
    usuario:  { type: DataTypes.STRING, allowNull: false, unique: true },
    password:  { type: DataTypes.STRING, allowNull: false },
    nombre:  { type: DataTypes.STRING, allowNull: false },
    apellidos:  { type: DataTypes.STRING, allowNull: false },
    user_type: {
      type:   DataTypes.ENUM,
      values: ['admin', 'staff', 'customer']
    }
  },
  {
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Address);
      }
    }
  });
  
  return User;
};