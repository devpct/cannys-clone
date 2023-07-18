const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json(), cors())


//tables
const Users = require('./models/usersModel')
const Feedback = require('./models/feedbackModel')



// Routes


//users
app.get('/data/users', async(req, res)=>{
    try {
        const user = await Users.find({})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/add/user', async(req, res)=>{
    try {
        const user = await Users.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//feedback
app.get('/data/feedback', async(req, res)=>{
    try {
        const feedback = await Feedback.find({})
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/add/feedback', async(req, res)=>{
    try {
        const feedback = await Feedback.create(req.body)
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.put('/update/feedback/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const feedback = await Feedback.findByIdAndUpdate(id, req.body)
        if(!feedback){
            return res.status(404).json({message: `cannot find any feedback with ID ${id}`})
        }
        const updateFeedback = await Feedback.findById(id)
        res.status(200).json(updateFeedback)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/delete/feedback/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const feedback = await Feedback.findByIdAndDelete(id)
        if (!feedback) {
            return res.status(404).json({message: `cannot find any feedback with ID ${id}`})
        }
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




//connecting to mongoDB
mongoose
.connect('mongodb://127.0.0.1:27017/ccdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log(`Starting development server at \x1b[34m${'http://localhost'}:${3000}\x1b[0m`)
    })
})
.catch((error) => {
    console.log(error)
})