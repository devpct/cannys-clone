const Joi = require('joi')

// Joi validation middleware for feedback input
const createFeedbackValidation = (req, res, next) => {
    const schema = Joi.object({
      like: Joi.string().max(10).required(),
      image: Joi.string().max(400).optional(),
      nameLastname: Joi.string().max(50).optional(),
      username: Joi.string().max(40).optional(),
      descriptions: Joi.string().max(500).optional(),
    })
  
    const { error } = schema.validate(req.body)
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
  
    next()
}

module.exports = createFeedbackValidation
