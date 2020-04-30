/**
* call library
*/
const express = require("express")
const router = express.Router()
const Table = require('../models/Table')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const tableController = require('../controllers/table.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isTable() || req.user.isAdmin() ) ) return next()
    res.redirect('/users/login')
}

/**
* route for all table
*/
router.get('/all/:page?',isAuthenticated, tableController.all_tables)

/**
* route for new table
*/
router.get('/new',isAuthenticated, tableController.render_table)

/**
* route for post table
*/
router.post('/new',isAuthenticated, [
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('numberplace').isLength({min: 1}).withMessage('number place is empty !'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char'),
] , tableController.new_table)

/**
* route for single waiter
*/
router.get('/single/:id',isAuthenticated, tableController.find_table_by_id)

/**
* route for edit waiter
*/
router.get('/edit/:id',isAuthenticated, tableController.edit_table_by_id)

/**
* route for update waiter
*/
router.post('/update',isAuthenticated,[
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('numberplace').isLength({min: 1}).withMessage('number place is empty !'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char'),
], tableController.update_table_by_id)

/**
* route for delete table
*/
router.post('/delete',isAuthenticated, tableController.delete_table_by_id)

module.exports = router