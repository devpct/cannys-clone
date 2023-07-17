const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())


//tables
const Users = require('./models/usersModel')



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