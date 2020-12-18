const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    display_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)