require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

app.use(cors())

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db')
)

app.listen(1234, () => console.log('Server Up'))