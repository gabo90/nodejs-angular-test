'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/index.js').User;

const roles = {
  admin: {
    users: ['index', 'create', 'read', 'update', 'delete'],
    addresses: ['index', 'create', 'read', 'update', 'delete']
  },
  staff: {
    users: ['index'],
    addresses: ['index', 'create', 'read', 'update', 'delete']
  },
  customer: {
    addresses: ['index']
  }
}

exports.authUser = async function (email) {
  try {
      var user = await User.find({ where: { email: email } })
      
      return user ? user : false;
  }
  catch (e) {
      throw Error(e.message);
  }
}

exports.encode = async function (payload) {
  try {
    payload['exp'] = Math.floor(Date.now() / 1000) + (60*60*60*24);
    
    var authToken = await jwt.sign(payload, config.secret);
    
    return authToken;
  }
  catch (e) {
    throw Error('Error al firmar el token: ' + e.message);
  }
}

exports.validate = async function (token) {
  try {   
    var payload = await jwt.verify(token, config.secret);
    
    return payload;
  }
  catch (e) {
    throw Error('Error al validar token: ' + e.message);
  }
}

exports.roleValidator = async function (role, resource, action) {
  try {
    var matchRole = roles[role]
    if (!matchRole) throw Error("No autorizado");
    
    var matchResource = matchRole[resource]
    if (!matchResource) throw Error("No autorizado");
    
    var permited = matchResource.indexOf(action);
    if (permited < 0) throw Error("No autorizado");
  }
  catch (e) {
    throw Error(e.message);
  }
}

exports.getPrivileges = async function (role) {
  try {
    var matchRole = roles[role]
    if (!matchRole) throw Error("Tipo de usuario no encontrado");
    return matchRole;
  }
  catch (e) {
    throw Error(e.message);
  }
}