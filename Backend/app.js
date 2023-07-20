const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()
app.use(express.json(), cors())

// Connecting to MongoDB database
mongoose
  .connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(config.port, () => {
      console.log(
        `Starting development server at \x1b[34m${'http://localhost'}:${config.port}\x1b[0m`
      )
    })
  })
  .catch((error) => {
    console.log(error)
})

// Connecting routes
app.use(userRoutes)
app.use(feedbackRoutes)
app.use(errorMiddleware)

module.exports = app