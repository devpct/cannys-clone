const Feedback = require('../models/feedbackModel')


// Get all feedbacks
const getAllFeedback = (req, res) => {
    Feedback.find({})
        .then((feedback) => {
            res.json(feedback)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}


// Create a new feedback
const createFeedback = (req, res) => {
    Feedback.create(req.body)
        .then((feedback) => {
            res.json(feedback)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}


// Update an existing feedback by ID
const updateFeedback = (req, res) => {
    const { id } = req.params
    Feedback.findByIdAndUpdate(id, req.body, { new: true })
        .then((feedback) => {
            if (!feedback) {
                return handleNotFoundResponse(res, id)
            }
            res.json(feedback)
        })
        .catch((error) => {
            handleErrorResponse(res, error)
        })
}


// Delete an existing feedback by ID
const deleteFeedback = (req, res) => {
    const { id } = req.params
    Feedback.findByIdAndDelete(id)
        .then((feedback) => {
            if (!feedback) {
                return handleNotFoundResponse(res, id)
            }
            res.json(feedback)
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
    res.status(404).json({ message: `Cannot find any feedback with ID ${id}` })
}

module.exports = {
    getAllFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback
}