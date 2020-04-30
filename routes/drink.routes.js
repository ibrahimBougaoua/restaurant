/**
* call library
*/
const express = require("express")
const router = express.Router()
const Drink = require('../models/Drink')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const drinkController = require('../controllers/drink.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isFooDrink() || req.user.isAdmin() )) return next()
    res.redirect('/users/login')
}

/**
* route for all drink
*/
router.get('/all/:page?',isAuthenticated, drinkController.all_drink)

/**
* route for new drink
*/
router.get('/new',isAuthenticated, drinkController.render_drink)

/**
* route for post drink
*/
router.post('/new',isAuthenticated, [
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('alcohol').isLength({min: 5}).withMessage('alcohol should be more than 5 char'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char')
] , drinkController.new_drink)

/**
* route for single drink
*/
router.get('/single/:id',isAuthenticated, drinkController.find_drink_by_id)

/**
* route for edit drink
*/
router.get('/edit/:id',isAuthenticated, drinkController.edit_drink_by_id)

/**
* route for update drink
*/
router.post('/update',isAuthenticated,[
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('alcohol').isLength({min: 5}).withMessage('alcohol should be more than 5 char'),
    check('type').isLength({min: 3}).withMessage('type should be more than 5 char'),
    check('description').isLength({min: 3}).withMessage('description should be more than 5 char')
], drinkController.update_drink_by_id)

/**
* route for new food
*/
router.post('/delete',isAuthenticated, drinkController.delete_drink_by_id)

module.exports = router