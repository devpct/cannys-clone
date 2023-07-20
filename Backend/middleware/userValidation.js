const Joi = require('joi');

// Joi validation middleware for user input
const createUserValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            nameLastname: Joi.string().max(50).required(),
            username: Joi.string().max(40).required(),
            password: Joi.string().min(8).max(8).required(),
            email: Joi.string().max(100).email().required(),
            image: Joi.string().max(400).required(),
        })

        const { error } = schema.validate(req.body)

        if (error) {
            throw new Error(error.details[0].message)
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = createUserValidation;
