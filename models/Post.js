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
    favorites: {
        type: Number,
        default: 0,
    },
    retweets: {
        type: Number,
        default: 0,
    },
    replies: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('Posts', PostSchema);