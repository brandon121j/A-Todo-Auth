var express = require('express');
var router = express.Router();
const { register } = require('./controller/userController');

router.post('/create-user', register);

module.exports = router