/**
* call library
*/
const Food = require('../models/Food')
const { check, validationResult } = require('express-validator/check')

/**
* new food
*
* @param req
* @param res
*/
exports.new_food = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/food/new')
    } else {
        
        let newFood = new Food({
            Name: req.body.name,
            Price: req.body.price,
            Type: req.body.type,
            Category : req.body.category,
            Description : req.body.description,
            created_at: Date.now(),
        })

        newFood.save( (err)=> {
            if(!err) {
                req.flash('success', ' The food was created successfuly')
                res.redirect('/food/all')
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
exports.all_food = function(req,res) {

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
    Food.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Food.find({},{},q, (err,food)=> {
        if(!err){
         res.render('food/index', {
            food : food,
            total : parseInt(totalDocs),
            page : page,
            title : "All food",
            success: req.flash('success')
         })
        } else {
            res.redirect('/food/new')
        }
    }).sort({created_at:'desc'}); 
})
  
}

/**
* get food by id
*
* @param req
* @param res
*/
exports.find_food_by_id = function(req,res) {
    Food.findOne({_id: req.params.id}, (err,food)=> {
        
        if(!err) {
 
         res.render('food/single', {
             food: food,
             title: "single food"
         })
 
        } else {
            console.log(err)
        }
     
     })
}

/**
* edit food by id
*
* @param req
* @param res
*/
exports.edit_food_by_id = function(req,res) {

     Food.findOne({_id: req.params.id}, (err,food)=> {
        
        if(!err) {
       
         res.render('food/edit', {
             food: food,
             title: "edit food",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update food by id
*
* @param req
* @param res
*/
exports.update_food_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/food/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
        Name: req.body.name,
        Price: req.body.price,
        Type: req.body.type,
        Category : req.body.category,
        Description : req.body.description,
        created_at: Date.now(),
       }
       let query = {_id: req.body.id}

       Food.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The food was updated successfuly"),
               res.redirect('/food/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
}

/**
* render food
*
* @param req
* @param res
*/
exports.render_food = function(req,res) {
    res.render('food/new', {
        errors: req.flash('errors'),
        title: "New food"
    })
}

/**
* delete food by id
*
* @param req
* @param res
*/
exports.delete_food_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Food.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The food was deleted successfuly")
            res.redirect('/food/all')
        } else {
            req.flash('error', 'food delete error')
            res.redirect('/food/single/' + req.params.id)
        }
    })
    
}