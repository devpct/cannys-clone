const mongoose = require('mongoose')

const likesSchema = mongoose.Schema(
    {
        user_id:{
            type: String,
            required: true
        },
        feedback_id: {
            type: String,
            required: true
        },
        like_date:{
            type: String,
            required: true
        },
    },
    {
        versionKey: false
    }
)

const Likes = mongoose.model('Likes', likesSchema)

module.exports = Likes