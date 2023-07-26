// Application Configuration
require('dotenv').config()

const database = require('./database')
const smtp = require('./smtp')

const config = {
  db: database,
  app: {
    port: process.env.APP_PORT,
  },
  smtp: smtp
}

module.exports = config
