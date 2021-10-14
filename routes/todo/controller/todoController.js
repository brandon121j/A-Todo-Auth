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
            done: false,
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

const completeTodo = async(req, res) => {
    try {
        let foundTodo = await Todo.findById(req.params.id);

        if (!foundTodo) {
            return res.status(404).json({
                message: "ERROR",
                error: "Todo not found"
            });
        } else {
            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({ email: decodedData.email });

            if (!foundUser) {
                res.status(404).json({ message: "USER NOT FOUND", error: error.message })
            } else {

            let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { done: true });
            
            await updatedTodo.save();

            res.json({ message: "SUCCESS", payload: foundTodo })
            }
        }

        } catch(error) {
        res
            .status(500)
            .json({ 
                message: "ERROR",
                error: error.message
            })
    }
}

const deleteTodo = async(req, res) => {
    try {
        let deletedTodo = await Todo.findByIdAndDelete;

        if (!deletedTodo) {
            res.status(404).json({
                message: "ERROR",
                error: "Todo not found"
            })
        } else {
            const decodedData = res.locals.decodedData;
            let foundUser = await User.findOne({ email: decodedData.email });
            let usersTodos = foundUser.todos;

            let filteredTodos = usersTodos
                .filter((item) => { item._id.toString() !== req.params.id });
        
            foundUser.todos = filteredTodos;
            await foundUser.save();
            res.json({ message: "SUCCESS", deleted: deleteTodo })
        }
    } catch(error) {
        res.status(500).json({message: "ERROR", error: error.message })
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    completeTodo,
    deleteTodo
}