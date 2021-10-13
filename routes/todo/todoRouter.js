var express = require('express');
const { createTodo, getAllTodos } = require('./controller/todoController');
var router = express.Router();
var { jwtMiddleware } = require('../user/lib/authMiddleware/index')

router.post('/create-todo', jwtMiddleware, createTodo);

router.get('/', jwtMiddleware, getAllTodos)

module.exports = router