const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    retweets: {
        type: Array,
        default: [],
    },
    replies: {
        type: Array,
        default: [],
    },
    repliedTo: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Posts', PostSchema);