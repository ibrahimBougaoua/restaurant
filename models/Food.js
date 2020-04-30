const mongoose = require('mongoose')

/**
* Food Schema
*/
const FoodsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Category : {
        type: String,
        required: true
    },
	Description : {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Food = mongoose.model('Food', FoodsSchema, 'Foods')

module.exports = Food