// Configuration for port and database URL
require('dotenv').config()

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  app: {
    port: process.env.APP_PORT,
  },
};

module.exports = config
