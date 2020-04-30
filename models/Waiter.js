const mongoose = require('mongoose')

/**
* Waiter Schema
*/
const WaiterSchema = new mongoose.Schema({
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
    },
})

let Waiter = mongoose.model('Waiter', WaiterSchema, 'waiters')

module.exports = Waiter