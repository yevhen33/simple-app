const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    titlePost: {
        type: String,
        default: "Post title"
    },
    descriptionPost: {
        type: String,
        default: "Description post"
    },
    imageSrc: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    user: {
       ref: 'User',
       type: Schema.Types.ObjectId
    },
    likes: [{
        ref: 'User',
        type: Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Post', postSchema);