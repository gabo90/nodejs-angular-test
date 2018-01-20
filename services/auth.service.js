'use strict';
var User = require('../models/index.js').User;

exports.authUser = async function (user, password) {
  try {
      var user = await User.find({usuario: user})
      
      return user ? user : false;
  }
  catch (e) {
      throw Error('Error al buscar el usuario');
  }
}