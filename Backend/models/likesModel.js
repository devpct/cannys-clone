const mongoose = require('mongoose')

const likesSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        feedbackId: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Likes = mongoose.model('Likes', likesSchema)

module.exports = Likes