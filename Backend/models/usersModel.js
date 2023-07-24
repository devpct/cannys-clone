const mongoose = require('mongoose')

const usersSchema = mongoose.Schema(
    {
        nameLastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Users = mongoose.model('Users', usersSchema)

module.exports = Users