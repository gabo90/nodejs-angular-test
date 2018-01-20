'use strict';
var express = require('express');
var router = express.Router();
var usersRouter = require('./users.route');
var addressesRouter = require('./addresses.route');
var jwt = require('jsonwebtoken');
var config = require('../../../config');

router.get('/', function(req, res, next) {
  res.json("API v 0.0.1");
});

router.get('/authenticate', function (req, res, next) {
  res.json("auth");
  next();
})

router.use(function(req, res, next) {
  console.log("middle")
  next();
})

router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);

module.exports = router;