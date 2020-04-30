/**
* call library
*/
const express = require("express")
const router = express.Router()
const Chef = require('../models/Chef')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const chefController = require('../controllers/chef.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isChef() || req.user.isAdmin() )) return next()
    res.redirect('/users/login')
}

/**
* route for all chef
*/
router.get('/all/:page?',isAuthenticated, chefController.all_chef)

/**
* route for new chef
*/
router.get('/new',isAuthenticated, chefController.render_chef)

/**
* route for post chef
*/
router.post('/new',isAuthenticated, [
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('email').isLength({min: 5}).withMessage('email should be more than 5 char'),
    check('experience').isLength({min: 5}).withMessage('experience should be more than 5 char'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('postcode').isLength({min: 5}).withMessage('postcode should be more than 5 char')
] , chefController.new_chef)

/**
* route for single chef
*/
router.get('/single/:id',isAuthenticated, chefController.find_chef_by_id)

/**
* route for edit chef
*/
router.get('/edit/:id',isAuthenticated, chefController.edit_chef_by_id)

/**
* route for update chef
*/
router.post('/update',isAuthenticated,[
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('email').isLength({min: 5}).withMessage('email should be more than 5 char'),
    check('experience').isLength({min: 5}).withMessage('experience should be more than 5 char'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char')
], chefController.update_chef_by_id)

/**
* route for delete chef
*/
router.post('/delete',isAuthenticated, chefController.delete_chef_by_id)

module.exports = router