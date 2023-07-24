const express = require('express')
const router = express.Router()
const FeedbackController = require('../controllers/feedbackController')
const feedbackValidation = require('../middleware/feedbackValidation')
const handleError = require('../middleware/errorMiddleware') 


// Routes for handling feedback data
router.get('/data/feedbacks', FeedbackController.getAllFeedback)
router.post('/add/feedback', feedbackValidation,(req, res) => {
        FeedbackController.createFeedback(req, res)
    }
    )
router.put('/update/feedback/:id', feedbackValidation,(req, res) => {
        FeedbackController.updateFeedback(req, res)
})
router.delete('/delete/feedback/:id', FeedbackController.deleteFeedback)

router.use(handleError)

module.exports = router