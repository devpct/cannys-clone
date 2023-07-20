const User = require('../models/usersModel')


// Get all users
const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            res.json(users)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}

// Create a new user
const createUser = (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}

// Function to handle error responses
const handleErrorResponse = (res, error) => {
    res.status(500).json({ message: error.message })
}


module.exports = {
    getAllUsers,
    createUser,
}