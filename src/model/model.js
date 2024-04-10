const mongoose = require('mongoose');
const pubSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conpassword: {
        type: String,
        required: true
    }

});

const pubCollection = new mongoose.model('pubCollection',pubSchema);

module.exports = pubCollection;