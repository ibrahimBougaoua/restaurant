/**
* call library
*/
const express = require("express")
const router = express.Router()
const Customer = require('../models/Customer')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
moment().format();
const customerController = require('../controllers/customer.controller')

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isCustomer() || req.user.isAdmin() )) return next()
    res.redirect('/users/login')
}

/**
* route for all customer
*/
router.get('/all/:page?',isAuthenticated, customerController.all_customers)

/**
* route for new customer
*/
router.get('/new',isAuthenticated, customerController.render_customer)

// route for post customer
/**
* middleware
*/
router.post('/new', [
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('contact').isLength({min: 3}).withMessage('contact should be more than 5 char'),
    check('email').isLength({min: 5}).withMessage('email should be more than 5 char'),
    ], customerController.new_customer)

/**
* route for single customer
*/
router.get('/single/:id',isAuthenticated, customerController.find_customer_by_id)

/**
* route for edit customer
*/
router.get('/edit/:id',isAuthenticated, customerController.edit_customer_by_id)

/**
* route for update customer
*/
router.post('/update',isAuthenticated,[
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('contact').isLength({min: 3}).withMessage('contact should be more than 5 char'),
    check('email').isLength({min: 3}).withMessage('email should be more than 5 char'),
], customerController.update_customer_by_id)

/**
* route for delete customer
*/
router.post('/delete',isAuthenticated, customerController.delete_customer_by_id)

module.exports = router