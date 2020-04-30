const mongoose = require('mongoose')

/**
* Drink Schema
*/
const DrinkSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Alcohol: {
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

let Drink = mongoose.model('Drink', DrinkSchema, 'Drinks')

module.exports = Drink