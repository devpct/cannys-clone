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
        time_date:{
            type: String,
            required: true
        },
        descriptions:{
            type: String,
            required: true
        },
        like:{
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback