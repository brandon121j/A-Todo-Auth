var express = require('express');
var router = express.Router();

const { 
    register, 
    login, 
    updateUser, 
    getUserInfo 
} = require('./controller/userController');

const { 
    jwtMiddleware,
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData 
} = require('./lib/authMiddleware/index');

router.post (
    '/create-user',
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    register,
);

router.post (
    '/login', 
    checkIsEmpty,
    checkIsUndefined,
    login
);

router.put(
    '/update-user', 
    jwtMiddleware, 
    checkIsEmpty,
    checkIsUndefined,
    validateUpdateData,
    updateUser
);

router.get(
    '/', 
    jwtMiddleware, 
    getUserInfo
);

module.exports = router