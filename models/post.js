const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postContent : {
        type: String,
        required: true
    },
    likes : { 
        type: Number,
        default: 0
    },
    comments : {
        type: [String]
    }
})

module.exports = mongoose.model('Post', postSchema)