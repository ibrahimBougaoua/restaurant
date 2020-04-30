/**
* call library
*/
const Drink = require('../models/Drink')
const { check, validationResult } = require('express-validator/check')

/**
* new drink
*
* @param req
* @param res
*/
exports.new_drink = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/drink/new')
    } else {
        
        let newDrink = new Drink({
            Name: req.body.name,
            Alcohol: req.body.alcohol,
            Type: req.body.type,
            Description : req.body.description,
            created_at: Date.now(),
        })

        newDrink.save( (err)=> {
            if(!err) {
                req.flash('success', ' The drink was created successfuly')
                res.redirect('/drink/all')
            } else {
                console.log(err)
            } 
        })
    }
}

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_drink = function(req,res) {

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
    Drink.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

        Drink.find({},{},q, (err,drink)=> {
        if(!err){
         res.render('drink/index', {
            drink : drink,
            total : parseInt(totalDocs),
            page : page,
            title : "All drink",
            success: req.flash('success')
         })
        } else {
            res.redirect('/drink/new')
        }
    }).sort({created_at:'desc'}); 
})
  
}

/**
* get drink by id
*
* @param req
* @param res
*/
exports.find_drink_by_id = function(req,res) {

    Drink.findOne({_id: req.params.id}, (err,drink)=> {
        
        if(!err) {
            
         res.render('drink/single', {
             drink: drink,
             title: "single drink"
         })
 
        } else {
            console.log(err)
        }
     
     })
  
}

/**
* edit drink by id
*
* @param req
* @param res
*/
exports.edit_drink_by_id = function(req,res) {
    
    Drink.findOne({_id: req.params.id}, (err,drink)=> {
        
        if(!err) {
       
         res.render('drink/edit', {
             drink: drink,
             title: "edit drink",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update drink by id
*
* @param req
* @param res
*/
exports.update_drink_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/drink/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
        Name: req.body.name,
        Alcohol: req.body.alcohol,
        Type: req.body.type,
        Description : req.body.description,
       }
       let query = {_id: req.body.id}

       Drink.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The drink was updated successfuly"),
               res.redirect('/drink/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
}

/**
* render drink
*
* @param req
* @param res
*/
exports.render_drink = function(req,res) {
    res.render('drink/new', {
        errors: req.flash('errors'),
        title: "new drink"
    })
}

/**
* delete drink by id
*
* @param req
* @param res
*/
exports.delete_drink_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Drink.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The drink was deleted successfuly")
            res.redirect('/drink/all')
        } else {
            req.flash('error', 'drink delete error')
            res.redirect('/drink/single/' + req.params.id)
        }
    })
    
}