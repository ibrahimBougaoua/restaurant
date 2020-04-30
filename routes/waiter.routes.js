/**
* call library
*/
const express = require("express")
const router = express.Router()
const Waiter = require('../models/Waiter')
const Table = require('../models/Table')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const waiterController = require('../controllers/waiter.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isWaiter() || req.user.isAdmin() ) ) return next()
    res.redirect('/users/login')
}

/**
* route for all Waiter
*/
router.get('/all/:page?',isAuthenticated, waiterController.all_waiter)

// route for new waiter
/**
* middleware
*/
router.get('/new',isAuthenticated, waiterController.render_waiter)

/**
* route for post waiter
*/
router.post('/new',isAuthenticated, [
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('email').isLength({min: 5}).withMessage('email should be more than 5 char'),
    check('postcode').isLength({min: 5}).withMessage('postcode should be more than 5 char')
] , waiterController.new_waiter)

/**
* route for single waiter
*/
router.get('/single/:id',isAuthenticated, waiterController.find_waiter_by_id)

/**
* route for edit waiter
*/
router.get('/edit/:id',isAuthenticated, waiterController.edit_waiter_by_id)

/**
* route for update waiter
*/
router.post('/update',isAuthenticated,[
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('email').isLength({min: 3}).withMessage('email should be more than 5 char'),
    check('postcode').isLength({min: 5}).withMessage('postcode should be more than 5 char')
], waiterController.update_waiter_by_id)

/**
* route for delete waiter
*/
router.post('/delete',isAuthenticated, waiterController.delete_waiter_by_id)

module.exports = router