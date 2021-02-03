require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const cors = require('cors')

app.use(cors())

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

app.listen(process.env.PORT || 1234, () => console.log('Server Up'))