const mongoose = require('mongoose')

/**
* Chef Schema
*/
const ChefSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Experience : {
        type: String,
        required: true
    },
    Type : {
        type: String,
        required: true
    },
	City : {
        type: String,
        required: true
    },
	Postcode : {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    },
    Sex: {
        type: String,
        required: true
    },
    Birthdate: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
})

let Chef = mongoose.model('chef', ChefSchema, 'chefs')

module.exports = Chef