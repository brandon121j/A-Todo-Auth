var express = require('express');
const { createTodo, getAllTodos, completeTodo, deleteTodo } = require('./controller/todoController');
var router = express.Router();
var { jwtMiddleware } = require('../user/lib/authMiddleware/index')

router.post('/create-todo', jwtMiddleware, createTodo);

router.get('/', jwtMiddleware, getAllTodos);

router.post('/complete-todo/:id', jwtMiddleware, completeTodo);

router.delete('/delete-by-id/:id', jwtMiddleware, deleteTodo);

module.exports = router