'use strict';
var User = require('../models/index.js').User;

exports.getUsers = async function (query) {
  try {
    var users = await User.findAll();

    return users;
  }
  catch (e) {
    throw Error(e.message);
  }   
}

exports.getUser = async function (id) {
  try {
    var user = await User.findById(id)

    return user ? user : false;
  }
  catch (e) {
    throw Error(e.message);
  }
}

exports.createUser = async function(user){
  try {
    var savedUser = await User.create(user, {fields: ['email', 'password', 'nombre', 'apellidos', 'user_type']})

    return savedUser;
  }
  catch(e) {     
    throw Error(e.message)
  }
}

exports.updateUser = async function(id, user){
  try {
    var userFound = await User.findById(id)

  }
  catch (e) {
    throw Error(e.message);
  }

  if(!userFound){
    return false;
  }

  try {
    userFound.update(user, {fields: ['email', 'password', 'nombre', 'apellidos', 'user_type']})
    return userFound;
  }
  catch(e) {
    throw Error(e.message);
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
    throw Error(e.message);
  }
}