/**
* call library
*/
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const multer = require('multer')
const { check, validationResult } = require('express-validator/check')
const userController = require('../controllers/user.controller')
const moment = require('moment');
moment().format();

/**
* cofigure multer
*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
  })
  
var upload = multer({ storage: storage })

/**
* middleware a
*/
isAuthenticatedAdmin = (req,res,next) => {
    if (req.isAuthenticated() && req.user.isAdmin()) return next()
    res.redirect('/users/login')
}

/**
* middleware b
*/
isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

/**
* route for get all page
*/
router.get('/all/:page?',isAuthenticatedAdmin, userController.all_users)

/**
* route for login user 
*/
router.get('/login', userController.render_user_login)

/**
* route login post request
*/
router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true })
)

/**
* route for sign up form 
*/
router.get('/new',isAuthenticatedAdmin,[
  check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
  check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
  check('contact').isLength({min: 5}).withMessage('contact should be more than 5 char'),
  check('email').isLength({min: 5}).withMessage('email should be more than 5 char')
] , userController.render_user)

/**
* route sign up post request
*/
router.post('/new',isAuthenticatedAdmin,
  passport.authenticate('local.new', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/new',
      failureFlash: true })
)

/**
* route for profile 
*/
router.get('/profile',isAuthenticated, userController.render_user_profile)

/**
* route for upload user avatar
*/
router.post('/avatar',upload.single('avatar'), userController.post_avatar)

/**
* route for user update
*/
router.post('/profile',isAuthenticated, [
  check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
  check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
  check('contact').isLength({min: 5}).withMessage('contact should be more than 5 char'),
  check('email').isLength({min: 5}).withMessage('email should be more than 5 char')
] , userController.update_user)

/**
* route for logout user
*/
router.get('/logout', userController.logout_user)

/**
* route for single user
*/
router.get('/single/:id',isAuthenticated, userController.find_user_by_id)

/**
* route for edit user
*/
router.get('/edit/:id',isAuthenticated, userController.edit_user_by_id)

/**
* route for update user
*/
router.post('/update',isAuthenticated,[
  check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
  check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
  check('contact').isLength({min: 5}).withMessage('contact should be more than 5 char'),
  check('email').isLength({min: 5}).withMessage('email should be more than 5 char')
], userController.update_user_by_id)

/**
* route for delete user
*/
router.post('/delete',isAuthenticated, userController.delete_user_by_id)

module.exports = router