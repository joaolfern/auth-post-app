const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
})

module.exports = mongoose.model('Image', ImageSchema)