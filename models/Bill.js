const mongoose = require('mongoose')

/**
* Bill Schema
*/
const BillSchema = new mongoose.Schema({
    Sub_Total: {
        type: String,
        required: true
    },
    Vat: {
        type: String,
        required: true
    },
    Total: {
        type: String,
        required: true
    },
    drink_id: {
        type: String,
        required: true
    },
    waiter_id: {
        type: String,
        required: true
    },
    food_id: {
        type: String,
        required: true
    },
    table_id: {
        type: String,
        required: true
    },
    CustomerID: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Bill = mongoose.model('Bill', BillSchema, 'Bills')

module.exports = Bill