'use strict';
var AuthService = require('../services/auth.service')


exports.authUser = async function(req, res, next) {
  try {    
    var user = await AuthService.authUser(req.body.email)

    if (!user) throw Error("Usuario no encontrado");
    if (user.password !== req.body.password) throw Error("Contraseña inválida");

    var privileges = await AuthService.getPrivileges(user.user_type);

    var payload = {
      user_id: user.id,
      user_type: user.user_type
    }
    var token = await AuthService.encode(payload);
    var data = {
      nombre: user.fullName.toString().toUpperCase(),
      tipo: user.user_type.toString().toUpperCase(),
      privilegios: privileges,
      authToken: token
    }

    return res.status(200).json({status: 200, data: data, message: "Autenticación exitosa"});
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.validate = async function(req, res, next) {
  try {
    if (!req.headers.authorization) throw Error("Sin token de autenticación");
    var authToken = req.headers.authorization.split(' ')[1];
    if (!authToken) throw Error("Sin token de autenticación");
    var payload = await AuthService.validate(authToken);
    
    req['role'] = payload.user_type

    next();
  }
  catch(e) {
    return res.status(401).json({status: 401, message: e.message});
  }
}