/**
* call library
*/
const express = require("express")
const router = express.Router()
const Bill = require('../models/Bill')
const Waiter = require('../models/Waiter')
const Food = require('../models/Food')
const Drink = require('../models/Drink')
const Table = require('../models/Table')
const Customer = require('../models/Customer')
const { check, validationResult } = require('express-validator/check')
const billController = require('../controllers/bill.controller')
const moment = require('moment');
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isBill() || req.user.isAdmin() ) ) return next()
    res.redirect('/users/login')
}

/**
* route for all bill
*/
router.get('/all/:page?',isAuthenticated, billController.all_bill)

/**
* route for new bill
*/
router.get('/new',isAuthenticated, billController.render_bill)

/**
* route for post bill
*/
router.post('/new',isAuthenticated, [
    check('sub_total').isLength({min: 5}).withMessage('sub total should be more than 5 char'),
    check('vat').isLength({min: 5}).withMessage('alcohol should be more than 5 char'),
    check('total').isLength({min: 5}).withMessage('type should be more than 5 char')
] , billController.new_bill)

/**
* show single bill
*/
router.get('/single/:id',isAuthenticated, billController.find_bill_by_id)

/**
* route for bill
*/
router.get('/edit/:id',isAuthenticated, billController.edit_bill_by_id)

/**
* route for update bill
*/
router.post('/update',isAuthenticated,[
    check('sub_total').isLength({min: 5}).withMessage('sub total should be more than 5 char'),
    check('vat').isLength({min: 5}).withMessage('alcohol should be more than 5 char'),
    check('total').isLength({min: 5}).withMessage('type should be more than 5 char')
], billController.update_bill_by_id)

/**
* route for delete bill
*/
router.post('/delete',isAuthenticated, billController.delete_bill_by_id)

module.exports = router