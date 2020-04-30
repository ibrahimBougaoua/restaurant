/**
* call library
*/
const express = require("express")
const router = express.Router()
const Booking = require('../models/Booking')
const Customer = require('../models/Customer')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const bookingController = require('../controllers/booking.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isBooking() || req.user.isAdmin() ) ) return next()
    res.redirect('/users/login')
}

/**
* route for all booking
*/
router.get('/all/:page?',isAuthenticated, bookingController.all_booking)
  
/**
* route for new booking
*/
router.get('/new',isAuthenticated, bookingController.render_booking)

/**
* route for post booking
*/
router.post('/new',isAuthenticated, bookingController.new_booking)

/**
* route for single booking
*/
router.get('/single/:id',isAuthenticated, bookingController.find_booking_by_id)

/**
* route for edit booking
*/
router.get('/edit/:id',isAuthenticated, bookingController.edit_booking_by_id)

/**
* route for update booking
*/
router.post('/update',isAuthenticated, bookingController.update_booking_by_id)

/**
* route for delete booking
*/
router.post('/delete',isAuthenticated, bookingController.delete_booking_by_id)

module.exports = router