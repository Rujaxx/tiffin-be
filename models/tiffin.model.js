const mongoose = require('mongoose');

const TiffinSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    kitchen: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    riderName: {
        type: String,
        default: null
    },
    deletedOn: {
        type: Date,
        default: null
    }
},{ timestamps: true });

const Tiffin = mongoose.model('Tiffin', TiffinSchema);

module.exports = Tiffin;
