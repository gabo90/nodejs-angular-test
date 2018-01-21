'use strict';
var express = require('express');
var router = express.Router();
var usersRouter = require('./users.route');
var addressesRouter = require('./addresses.route');
var AuthController = require('../../../controllers/auth.controller')

router.get('/', function(req, res, next) {
  res.json("API v 0.0.1");
});
router.post('/authenticate', AuthController.authUser);
router.use(AuthController.validate);
router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);

module.exports = router;