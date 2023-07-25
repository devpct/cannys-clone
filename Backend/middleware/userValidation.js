const Joi = require('joi')
const crypto = require('crypto')
const User = require('../models/usersModel')

// Joi validation middleware for user input
const createUserValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            nameLastname: Joi.string().max(50).required(),
            username: Joi.string().min(4).max(40).required(),
            password: Joi.string().min(8).max(8).required(),
            email: Joi.string().max(100).email().required(),
            image: Joi.string().max(400).optional()
        })

        const { error } = schema.validate(req.body)

        if (error) {
            throw new Error(error.details[0].message)
        }


        // Password hashing
        const hashedPassword = crypto.createHash('md5').update(req.body.password).digest('hex')
        req.body.password = hashedPassword


        next()
    } catch (error) {
        next(error)
        console.log(error);
    }
}

module.exports = createUserValidation
