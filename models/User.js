const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 25
    },
    email: {
        type: String,
        require: true,
        min: 0,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    }
})

module.exports = mongoose.model('User', UserSchema)