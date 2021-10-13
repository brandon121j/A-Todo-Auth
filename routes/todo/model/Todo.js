const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema (
    {
        todo: {
            type: String
        },
        done: {
            type: Boolean
        },
        user: { 
            type: mongoose.Schema.ObjectId, 
            ref: "todo" 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('todo', todoSchema);