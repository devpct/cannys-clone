const Joi = require('joi')

// Joi validation middleware for feedback input
const createFeedbackValidation = (req, res, next) => {
    const schema = Joi.object({
      image: Joi.string().max(400).required(),
      nameLastname: Joi.string().max(50).required(),
      username: Joi.string().max(40).required(),
      time_date: Joi.string().max(40).required(),
      descriptions: Joi.string().max(500).required(),
      like: Joi.string().max(10).required(),
    })
  
    const { error } = schema.validate(req.body)
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
  
    next()
}

module.exports = createFeedbackValidation
