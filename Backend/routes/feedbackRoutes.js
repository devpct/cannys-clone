const express = require('express')
const router = express.Router()
const FeedbackController = require('../controllers/feedbackController')
const feedbackValidation = require('../middleware/feedbackValidation')
const handleError = require('../middleware/errorMiddleware') 


// Routes for handling feedback data
router.get('/data/feedback', FeedbackController.getAllFeedback)
router.post('/add/feedback', feedbackValidation,(req, res) => {
        FeedbackController.createUser(req, res)
    }
    )
    router.put('/update/feedback/:id', feedbackValidation, feedbackValidation,(req, res) => {
        FeedbackController.createUser(req, res)
})
router.delete('/delete/feedback/:id', FeedbackController.deleteFeedback)

router.use(handleError)

module.exports = router