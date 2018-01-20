'use strict';
var express = require('express');
var userRouter = express.Router();
var addressRouter = require('./addresses.route');
var UserController = require('../../../controllers/user.controller');

userRouter.use('/:user_id/addresses', addressRouter);

userRouter.get('/', UserController.getUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.createUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
