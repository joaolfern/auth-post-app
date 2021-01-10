require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const path = require('path')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if (req.method == 'OPTIONS') {
        res.header('Access-COntrol-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use(
    '/files',
    express.static('./temp/uploads')
)

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db')
)

app.listen(1234, () => console.log('Server Up'))