const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const userValidation = require('../middleware/userValidation')
const handleError = require('../middleware/errorMiddleware') 

// Routes for handling user data
router.get('/data/users', UserController.getAllUsers)
router.post('/add/user', userValidation, (req, res) => {
    UserController.createUser(req, res)
})

router.use(handleError)

module.exports = router
