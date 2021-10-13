const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

async function register (req, res) {
    let body = req.body;
    const { firstName, lastName, username, email, password } = body;

    try {
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed
        });

        let savedUser = await createdUser.save();
        res.json({ message: "SUCCESS", payload: savedUser })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

module.exports = {
    register
}