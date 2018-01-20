'use strict';
var UserService = require('../services/user.service')

exports.getUsers = async function(req, res, next) {
  try {
    var users = await UserService.getUsers({});

    return res.status(200).json({status: 200, data: users, message: "Búsqueda exitosa"});
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.getUser = async function(req, res, next) {
  try {
    var user = await UserService.getUser(req.params.id);
    
    if (!user) throw Error("Usuario no encontrado");
    
    return res.status(200).json({status: 200, data: user, message: "Búsqueda exitosa"});
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.createUser = async function(req, res, next) {
  try {
    var user = req.body.user;
    var createdUser = await UserService.createUser(user)
    return res.status(201).json({status: 201, data: createdUser, message: "Usuario creado exitosamente"})
  }
  catch(e) {  
    return res.status(400).json({status: 400, message: e.message})
  }
}

exports.updateUser = async function(req, res, next) {
  try {
    var id = req.params.id;
    var user = req.body.user;
    var updatedUser = await UserService.updateUser(id, user)
    
    if (!updatedUser) throw Error("Usuario no encontrado");  
    
    return res.status(200).json({status: 200, data: updatedUser, message: "Usuario actualizado exitosamente"})
  }
  catch(e) {
    return res.status(400).json({status: 400., message: e.message})
  }
}

exports.deleteUser = async function(req, res, next){
  try {
    var id = req.params.id;
    var deletedUser = await UserService.deleteUser(id)

    if (!deletedUser) throw Error("Usuario no encontrado");
    
    return res.status(200).json({status:204, message: "Usuario eliminado exitosamente"})
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message})
  }

}