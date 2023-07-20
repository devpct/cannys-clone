const express = require('express')
const router = express.Router()
const FeedbackController = require('../controllers/feedbackController')

// Routes for handling feedback data
router.get('/data/feedback', FeedbackController.getAllFeedback)
router.post('/add/feedback', FeedbackController.createFeedback)
router.put('/update/feedback/:id', FeedbackController.updateFeedback)
router.delete('/delete/feedback/:id', FeedbackController.deleteFeedback)

module.exports = router