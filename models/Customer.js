const mongoose = require('mongoose')

/**
* Customer Schema
*/
const CustomerSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Customer = mongoose.model('Customer', CustomerSchema, 'customers')

module.exports = Customer