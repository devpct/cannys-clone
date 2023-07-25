const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {
        image:{
            type: String,
            required: true
        },
        nameLastname: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        timeDate:{
            type: String,
            required: true
        },
        descriptions:{
            type: String,
            required: true
        },
        like:{
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback