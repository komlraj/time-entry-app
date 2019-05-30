const express = require('express');
const userController = require('../controllers/user.controller');

var router = express.Router();

router.post('/register', userController.signup);

router.post('/login', userController.login);

router.get('/isLoggedin', userController.isLoggedIn);

module.exports = router;