'use strict';
module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define('User', {
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Ya existe un usuario con ese correo"
      },
    },
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
    },
    getterMethods: {
      fullName: function() { return this.nombre + ' ' + this.apellidos }
    },
  });
  
  return User;
};