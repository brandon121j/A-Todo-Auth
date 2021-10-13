const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema (
    {
        todo: {
            type: String
        },
        done: {
            type: boolean
        },
        user: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('todo', todoSchema);