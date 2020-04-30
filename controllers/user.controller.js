/**
* call library
*/
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check')

/**
* post avatar
*
* @param req
* @param res
*/
exports.post_avatar = function(req,res) {

let newFields = {
    avatar:req.file.filename
}
User.updateOne({_id:req.user._id},newFields,(err)=>{
    if(!err) {
        res.redirect('/users/profile')
    }
})

}

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_users = function(req,res) {

    let page = 1
    if(req.params.page){
        page = parseInt(req.params.page)
    }
    if(req.params.page == 0) {
       page = 1
    }
    let q = {
        skip:5*(page-1),
        limit:5
    }

    let totalDocs = 0
    User.countDocuments({},(err,total)=>{
  
    }).then((response)=>{
        totalDocs = parseInt(response)
  
    User.find({_id:{$ne:req.user._id}},{},q, (err,users)=> {
        if(!err){
         res.render('user/index', {
            users : users,
            total : parseInt(totalDocs),
            page : page,
            title : "All users",
            success: req.flash('success')
         })
        } else {
            res.redirect('/user/new')
        }
    }).sort({created_at:'desc'}); 
  
      })
}

/**
* update user by id
*
* @param req
* @param res
*/
exports.update_user = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/users/profile')
    } else {

let newUser = new User()
let newFieldsWithPass = {
    Fname:req.body.firstname,
    LName:req.body.lastname,
    Contact:req.body.contact,
    email:req.body.email,
    password:newUser.hashSyncPass(req.body.password),
}
let newFieldsWithoutPass = {
    Fname:req.body.firstname,
    LName:req.body.lastname,
    Contact:req.body.contact,
    email:req.body.email
}
if(req.body.password == req.body.confirm_password){
    if(req.body.password != ""){
    User.updateOne({_id:req.user._id},newFieldsWithPass,(err)=>{
        if(!err) {               
            req.flash('success', " The user was updated successfuly")
            res.redirect('/users/profile')
        }
    })
} else {
    User.updateOne({_id:req.user._id},newFieldsWithoutPass,(err)=>{
        if(!err) {               
            req.flash('success', " The user was updated successfuly")
            res.redirect('/users/profile')
        }
    })
}
} else {
            req.flash('error', "The password not match")
            res.redirect('/users/profile')
}

}

}

/**
* logout user
*
* @param req
* @param res
*/
exports.logout_user = function(req,res) {
    req.logout();
    res.redirect('/users/login');
}

/**
* get user by id
*
* @param req
* @param res
*/
exports.find_user_by_id = function(req,res) {
    User.findOne({_id: req.params.id}, (err,user)=> {
        
        if(!err) {
            
         res.render('user/single', {
             user: user,
             title: "single user"
         })
 
        } else {
            console.log(err)
        }
     
     })
  
}

/**
* edit user by id
*
* @param req
* @param res
*/
exports.edit_user_by_id = function(req,res) {
    
    User.findOne({_id: req.params.id}, (err,user)=> {
        
        if(!err) {
       
         res.render('user/edit', {
            user: user,
            title: "edit user",
            errors: req.flash('errors'),
            success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update user by id
*
* @param req
* @param res
*/
exports.update_user_by_id = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/users/edit/' + req.body.id)
    } else {
    let newUser = new User()
    let newFieldsWithPass = {
        Fname:req.body.firstname,
        LName:req.body.lastname,
        Contact:req.body.contact,
        email:req.body.email,
        role:req.body.role,
        password:newUser.hashSyncPass(req.body.password),
    }
    let newFieldsWithoutPass = {
        Fname:req.body.firstname,
        LName:req.body.lastname,
        Contact:req.body.contact,
        email:req.body.email,
        role:req.body.role,
        password:newUser.hashSyncPass(req.body.password)
    }
    if(req.body.password == req.body.confirm_password){
        if(req.body.password != ""){
        User.updateOne({_id:req.body.id},newFieldsWithPass,(err)=>{
            if(!err) {               
                req.flash('success', " The user was updated successfuly"),
                res.redirect('/users/edit/' + req.body.id)
            }
        })
        } else {
            User.updateOne({_id:req.body.id},newFieldsWithoutPass,(err)=>{
                if(!err) {               
                    req.flash('success', " The user was updated successfuly")
                    res.redirect('/users/edit/' + req.body.id)
                }
            })
        }
    } else {
                req.flash('error', "The password not match")
                res.redirect('/users/edit/' + req.body.id)
    }
}
}

/**
* render user profile
*
* @param req
* @param res
*/
exports.render_user_profile = function(req,res) {
    res.render('user/profile', {
        success: req.flash('success'),
        errors: req.flash('errors'),
        error: req.flash('error'),
        title: "profile"
    })
}

/**
* render user
*
* @param req
* @param res
*/
exports.render_user = function(req,res) {
    res.render('user/new', {
        error: req.flash('error'),
        title: "New user"
    })
}

/**
* render user login
*
* @param req
* @param res
*/
exports.render_user_login = function(req,res) {
res.render('user/login', {
    error: req.flash('error'),
    title: "Login To Panel"
})
}

/**
* delete user by id
*
* @param req
* @param res
*/
exports.delete_user_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    User.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The user was deleted successfuly")
            res.redirect('/users/all')
        } else {
            req.flash('error', 'user delete error')
            res.redirect('/users/single/' + req.params.id)
        }
    })
    
}