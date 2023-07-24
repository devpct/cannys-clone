const Like = require('../models/likesModel')

// Get all likes
const getAllLikes = (req, res) => {
    Like.find({})
        .then((like) => {
            res.json(like)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}


// Create a new like
const createLike = (req, res) => {
    Like.create(req.body)
        .then((feedback) => {
            res.json(feedback)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}


// Delete an existing like by ID
const deleteLike = (req, res) => {
    const { id } = req.params
    Like.findByIdAndDelete(id)
        .then((like) => {
            if (!like) {
                return handleNotFoundResponse(res, id)
            }
            res.json(like)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}

// Function to handle error responses
const handleErrorResponse = (res, error) => {
    res.status(500).json({ message: error.message })
}

// Function to handle not found responses
const handleNotFoundResponse = (res, id) => {
    res.status(404).json({ message: `Cannot find any like with ID ${id}` })
}

module.exports = {
    getAllLikes,
    createLike,
    deleteLike
}