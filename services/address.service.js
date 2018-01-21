var Address = require('../models/index.js').Address;

exports.getAddresses = async function (query) {
  try {
    var addresses = await Address.findAll();

    return addresses;
  } catch (e) {
    throw Error(e.message);
  }   
}

exports.getAddress = async function (id) {
  try {
    var address = await Address.findById(id)
    return address ? address : false;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createAddress = async function(address){
  try {
    var savedAddress = await Address.create(address, {fields: ['nombre', 'direccion']})

    return savedAddress;
  }
  catch(e) {     
    throw Error(e.message)
  }
}

exports.updateAddress = async function(id, address){
  try {
    var addressFound = await Address.findById(id)
  }
  catch (e) {
    throw Error(e.message);
  }

  if(!addressFound){
    return false;
  }

  try {
    addressFound.update(address, {fields: ['nombre', 'direccion']})
    return addressFound;
  }
  catch(e) {
    throw Error(e.message);
  }
}

exports.deleteAddress = async function(id){
  try {
    var address = await Address.findById(id)

    return address ? address.destroy() : false;
  }
  catch (e) {
    throw Error(e.message);
  }
}