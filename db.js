const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/myapp');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;