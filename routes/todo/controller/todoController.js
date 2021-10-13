const Todo = require('../model/Todo');
const User = require('../../user/model/User');

const createTodo = async(req, res) => {
    try {
        console.log(res.locals)
        const { todo } = req.body;
        
        const decodedData = res.locals.decodedData;
        
        let foundUser = await User.findOne({ email: decodedData.email });

        const createdTodo = new Todo ({
            todo,
            done: true,
            user: foundUser._id
        })

        let savedTodo = await createdTodo.save();

        foundUser.todos.push(savedTodo._id);

        await foundUser.save();

        res.json({ message: "SUCCESS", payload: createdTodo })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

const getAllTodos = async(req, res) => {
    try {
        let foundTodos = await Todo.find({});

        res.json({
            message: "SUCCESS",
            foundTodos
        })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

module.exports = {
    createTodo,
    getAllTodos
}