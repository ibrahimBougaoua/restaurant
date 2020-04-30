const mongoose = require('mongoose')

/**
* Booking Schema
*/
const BookingSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    number_place: {
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

let Booking = mongoose.model('booking', BookingSchema, 'booking')

module.exports = Booking