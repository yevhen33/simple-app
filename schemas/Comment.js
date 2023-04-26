const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    content: {
        type: String,
        default: 'comment'
    },
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    post: {
        ref: 'Post',
        type: Schema.Types.ObjectId
    },
    created: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        ref: 'User',
        type: Schema.Types.ObjectId
    }],
    commentID: {
        type: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);