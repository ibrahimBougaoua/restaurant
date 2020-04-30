/**
* call library
*/
const express = require("express")
const router = express.Router()
const Food = require('../models/Food')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const foodController = require('../controllers/food.controller')

moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated() && ( req.user.isFooDrink() || req.user.isAdmin() ) ) return next()
    res.redirect('/users/login')
}

/**
* route for new food
*/
router.get('/all/:page?',isAuthenticated, foodController.all_food)

/**
* route for new food
*/
router.get('/new',isAuthenticated, foodController.render_food)

/**
* route for post food
*/
router.post('/new',isAuthenticated, [
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('category').isLength({min: 5}).withMessage('category should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char')
] , foodController.new_food)

/**
* route for single food
*/
router.get('/single/:id',isAuthenticated, foodController.find_food_by_id)

/**
* route for edit food
*/
router.get('/edit/:id',isAuthenticated, foodController.edit_food_by_id)

/**
* route for update food
*/
router.post('/update',isAuthenticated,[
    check('name').isLength({min: 5}).withMessage('name should be more than 5 char'),
    check('price').isLength({min: 5}).withMessage('price should be more than 5 char'),
    check('type').isLength({min: 5}).withMessage('type should be more than 5 char'),
    check('category').isLength({min: 3}).withMessage('category should be more than 5 char'),
    check('description').isLength({min: 3}).withMessage('description should be more than 5 char')
], foodController.update_food_by_id)

/**
* route for delete food
*/
router.post('/delete',isAuthenticated, foodController.delete_food_by_id)

module.exports = router