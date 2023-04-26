const mongoose = require('mongoose');
const {Schema} = mongoose;

const userShema = new Schema({
    name: {
        type: String,
        require: true,
        maxlength: 100,
        trim: true
    },
    login: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        require: true,
        maxlength: 100,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userShema);