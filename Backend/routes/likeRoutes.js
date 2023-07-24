const express = require('express')
const router = express.Router()
const LikeController = require('../controllers/likeController')
const handleError = require('../middleware/errorMiddleware') 

// Routes for handling like data
router.get('/data/likes', LikeController.getAllLikes)
router.post('/add/like', LikeController.createLike)
router.delete('/delete/like/:id', LikeController.deleteLike)

router.use(handleError)

module.exports = router
