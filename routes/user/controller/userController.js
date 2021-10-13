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

//Added ability to login with either username or password
async function login (req, res) {
    const { username, password, email } = req.body

    try {
        
        let foundUser = await User.findOne({ username: username })

        if (!foundUser) {
            let foundEmail = await User.findOne({ email: email });

            if (!foundUser && !foundEmail) {
                res.status(500).json({
                    message: "ERROR",
                    error: "Invalid login credentials"
                })
            } else {
                let comparedPassword = bcrypt.compare(password, foundEmail.password);
            
                if (!comparedPassword) {
                    res.status(500).json({
                        messsage: "ERROR",
                        error: "Please check your email and password"
                    })
                } else {
                    let jwtToken = jwt.sign(
                        {
                            email: foundEmail.email,
                            username: foundEmail.username
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    res.json({ message: "SUCCESS", payload: jwtToken });
                }
            
            }
        } else {
            let passwordComparer = await bcrypt.compare (password, foundUser.password);
        
            if (!passwordComparer) {
                return res.status(500).json({
                    message: "ERROR",
                    error: "Please check username and password"
                })
            } else {
                let jwtToke = jwt.sign(
                    {
                        email: foundUser.email,
                        username: foundUser.username
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );
                res.json({ message: "SUCCESS", payload: jwtToke })
            }
        }
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

async function updateUser (req, res) {
    try {
        const { password } = req.body;

        const decodedData = res.locals.decodedData;

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;

        let updatedUser = await User.findByIdAndUpdate(
            { email: decodedData.email },
            req.body,
            { new: true }
        );

        res.json({
            message: "SUCCESS",
            payload: updatedUser
        })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        });
    }
}

module.exports = {
    register,
    login,
    updateUser
}