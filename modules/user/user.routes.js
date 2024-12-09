const express = require('express');
const { login, signup, updateUser, getUser } = require('./user.controller');
const { isAuthenticated } = require('../../config/passport');

const userRouter = express.Router();

userRouter.post('/user/signup', signup);
userRouter.post('/user/login', login);
userRouter.post('/user/update/:id', isAuthenticated, updateUser);
userRouter.get('/user/:id', getUser);

module.exports = userRouter;