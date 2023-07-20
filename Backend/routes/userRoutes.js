const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

// Routes for handling user data
router.get('/data/users', UserController.getAllUsers)
router.post('/add/user', UserController.createUser)

module.exports = router
