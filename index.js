require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db')
)

app.listen(3000, () => console.log('Server Up'))