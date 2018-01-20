'use strict';
var express = require('express');
var router = express.Router({mergeParams: true});
var AddressController = require('../../../controllers/address.controller');

router.get('/', AddressController.getAddresses);
router.get('/:id', AddressController.getAddress);
router.post('/', AddressController.createAddress);
router.put('/:id', AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

module.exports = router;
