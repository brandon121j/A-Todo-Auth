var express = require('express');
var router = express.Router();
const { register, login, updateUser } = require('./controller/userController');
const { jwtMiddleware } = require('./lib/authMiddleware/index');

router.post('/create-user', register);

router.post('/login', login);

router.put('/update-user', jwtMiddleware, updateUser)

module.exports = router