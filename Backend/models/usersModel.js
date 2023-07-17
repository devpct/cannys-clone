const mongoose = require('mongoose')

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
    },
    {
        versionKey: false
    }
)

const Users = mongoose.model('Users', usersSchema)

module.exports = Users