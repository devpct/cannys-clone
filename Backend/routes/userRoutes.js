const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const userValidation = require('../middleware/userValidation')
const emailService = require('../services/emailService')
const handleError = require('../middleware/errorMiddleware') 

// Routes for handling user data
router.get('/data/users', UserController.getAllUsers)
router.post('/add/user', userValidation, (req, res) => {UserController.createUser(req, res)})
router.post('/send/verifycode', emailService.sendVerifyCode)

router.use(handleError)

module.exports = router
