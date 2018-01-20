'use strict';
var User = require('../models/index.js').User;

exports.getUsers = async function (query) {
  try {
    var users = await User.findAll();

    return users;
  }
  catch (e) {
    throw Error('Error al obtener los usuarios');
  }   
}

exports.getUser = async function (id) {
  try {
    var user = await User.findById(id)

    return user ? user : false;
  }
  catch (e) {
    throw Error('Error al buscar el usuario');
  }
}

exports.createUser = async function(user){
  try {
    var savedUser = await User.create(user, {fields: ['usuario', 'password', 'nombre', 'apellidos', 'user_type']})

    return savedUser;
  }
  catch(e) {     
    throw Error("Error al crear el usario: " + e)
  }
}

exports.updateUser = async function(id, user){
  try {
    var userFound = await User.findById(id)

  }
  catch (e) {
    throw Error('Error al buscar el usuario');
  }

  if(!userFound){
    return false;
  }

  try {
    userFound.update(user, {fields: ['usuario', 'password', 'nombre', 'apellidos', 'user_type']})
    return userFound;
  }
  catch(e) {
    throw Error("Error al actualizar el usuario");
  }
}

exports.deleteUser = async function(id){
  try {
    var user = await User.findById(id)
    if (user)
    {
      await user.getAddresses()
      .then((addresses) => {
        addresses.forEach((address) => {
          address.destroy();
        });
      })
      return user.destroy();
    } 
    else
    {
      return false;
    }
  }
  catch (e) {
    throw Error('Error al eliminar el usuario');
  }
}