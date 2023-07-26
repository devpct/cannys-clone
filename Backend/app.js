const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const likeRoutes = require('./routes/likeRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()
app.use(express.json(), cors())

const { host, port, name, username, password } = require('./config/database')
const dbConnectionString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(config.app.port, () => {
      console.log(
        `Starting development server at \x1b[34m${'http://localhost'}:${config.app.port}\x1b[0m`
      )
    })
  })
  .catch((error) => {
    console.log(error)
})

// Connecting routes
app.use(userRoutes)
app.use(feedbackRoutes)
app.use(likeRoutes)
app.use(errorMiddleware)

module.exports = app