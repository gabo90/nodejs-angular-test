'use strict';
var AddressService = require('../services/address.service')
var UserService = require('../services/user.service')
var AuthService = require('../services/auth.service')

exports.getAddresses = async function(req, res, next) {
  try {
    await AuthService.roleValidator(req.role, 'addresses', 'index');
    
    var user_id = req.params.user_id;
    var addresses = false;
    
    if (user_id)
    {
      var user = await UserService.getUser(user_id);
      if (!user) throw Error("Usuario no encontrado");

      await user.getAddresses()
      .then((user_addresses) => {
        addresses = user_addresses;
      });
    }
    else
    {
      addresses = await AddressService.getAddresses({});
    }

    return res.status(200).json({status: 200, data: addresses, message: "Búsqueda exitosa"});
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.getAddress = async function(req, res, next) {
  try {
    await AuthService.roleValidator(req.role, 'addresses', 'read');

    var user_id = req.params.user_id;
    var address;
    
    if (user_id)
    {
      var user = await UserService.getUser(user_id);
      if (!user) throw Error("Usuario no encontrado");
      
      await user.getAddresses({where: {id: req.params.id}})
      .then((addresses) => {
        address = addresses[0];
      });
    }
    else
    {
      address = await AddressService.getAddress(req.params.id);
    }
    
    if (!address) throw Error("Dirección no encontrada");

    return res.status(200).json({status: 200, data: address, message: "Búsqueda exitosa"});
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.createAddress = async function(req, res, next) {
  try {
    await AuthService.roleValidator(req.role, 'addresses', 'create');

    var address = req.body.address;
    var user_id = req.params.user_id;
    var createdAddress = false;
    
    if (user_id)
    { 
      var user = await UserService.getUser(user_id);
      
      if (!user) throw Error("Usuario no encontrado");
      
      await user.createAddress(address)
      .then((address) => {
        createdAddress = address;
      });
    }
    else
    {
      createdAddress = await AddressService.createAddress(address);
    }

    return res.status(201).json({status: 201, data: createdAddress, message: "Dirección creada exitosamente"})
  }
  catch(e) {  
    return res.status(400).json({status: 400, message: e.message})
  }
}

exports.updateAddress = async function(req, res, next) { 
  try {
    await AuthService.roleValidator(req.role, 'addresses', 'update');

    var user_id = req.params.user_id;
    var address = req.body.address;
    var oldAddress, updatedAddress;
    var user = await UserService.getUser(user_id);
    
    if (user_id)
    { 
      var user = await UserService.getUser(user_id);
      
      if (!user) throw Error("Usuario no encontrado");
      
      await user.getAddresses({where: {id: req.params.id}})
      .then((addresses) => {
        oldAddress = addresses[0];
      });
    }
    else
    {
      oldAddress = await AddressService.getAddress(req.params.id);
    }
    
    if (!oldAddress) throw Error("Dirección no encontrada");
    updatedAddress = await AddressService.updateAddress(oldAddress.id, address)
    
    return res.status(200).json({status: 200, data: updatedAddress, message: "Dirección actualizada exitosamente"})
  }
  catch(e) {
    return res.status(400).json({status: 400., message: e.message})
  }
}

exports.deleteAddress = async function(req, res, next) {
  try {
    await AuthService.roleValidator(req.role, 'addresses', 'delete');

    var user_id = req.params.user_id;
    var address = req.body.address;
    var addressFound;
    
    if (user_id)
    { 
      var user = await UserService.getUser(user_id);
      
      if (!user) throw Error("Usuario no encontrado");
      
      await user.getAddresses({where: {id: req.params.id}})
      .then((addresses) => {
        addressFound = addresses[0];
      });

      if (!addressFound) throw Error("Dirección no encontrada");
      
      await user.removeAddress(addressFound)
      .then(() => {
        AddressService.deleteAddress(addressFound.id);
      })
    }
    else
    {
      addressFound = await AddressService.getAddress(req.params.id);
      
      if (!addressFound) throw Error("Dirección no encontrada");
      
      await AddressService.deleteAddress(addressFound.id);
    }

    return res.status(200).json({status:204, message: "Dirección eliminada exitosamente"})
  }
  catch(e) {
    return res.status(400).json({status: 400, message: e.message})
  }
}