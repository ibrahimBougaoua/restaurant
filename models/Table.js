const mongoose = require('mongoose')

/**
* Table Schema
*/
const TableSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    NumberPlace: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Table = mongoose.model('Table', TableSchema, 'Tables')

module.exports = Table