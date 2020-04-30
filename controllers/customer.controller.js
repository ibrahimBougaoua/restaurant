/**
* call library
*/
const Customer = require('../models/Customer');
const { check, validationResult } = require('express-validator/check')

/**
* new customer
*
* @param req
* @param res
*/
exports.new_customer = function(req,res) {
    
    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/customer/new')
    } else {
        
        Customer.findOne({Email: req.body.email}, (err,chef)=> {
        
        if(err) {

        let newCustomer = new Customer({
            Fname: req.body.firstname,
            LName: req.body.lastname,
            Contact: req.body.contact,
            Email: req.body.email,
            created_at: Date.now()
        })

        newCustomer.save( (err)=> {
            if(!err) {
                console.log('Customer was added')
                req.flash('success', ' The Customer was created successfuly')
                res.redirect('/customer/all')
            } else {
                console.log(err)
            } 
        })

    } else {
        req.flash('error', 'Email already exists')
        res.redirect('/customer/new')
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
exports.all_customers = function(req,res) {
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
    Customer.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)

    Customer.find({},{},q, (err,customers)=> {
        if(!err){
         res.render('customer/index', {
            customers : customers,
            total : parseInt(totalDocs),
            page : page,
            title : "All customer",
            success: req.flash('success')
         })
        } else {
            res.redirect('/customer/new')
        }
    }).sort({created_at:'desc'}); 

      })

}

/**
* get customer by id
*
* @param req
* @param res
*/
exports.find_customer_by_id = function(req,res) {

Customer.findOne({_id: req.params.id}, (err,customer)=> {
        
    if(!err) {
        
     res.render('customer/single', {
         customer: customer,
         title: "single customer"
     })

    } else {
        console.log(err)
    }
 
 })
 
}

/**
* edit customer by id
*
* @param req
* @param res
*/
exports.edit_customer_by_id = function(req,res) {

    Customer.findOne({_id: req.params.id}, (err,customer)=> {
            
        if(!err) {
       
         res.render('customer/edit', {
             customer: customer,
             title: "edit customer",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
    
        } else {
            console.log(err)
        }
     
     })
    
}

/**
* update customer by id
*
* @param req
* @param res
*/
exports.update_customer_by_id = function(req,res) {

const errors = validationResult(req)
if( !errors.isEmpty()) {
   
    req.flash('errors',errors.array())
    res.redirect('/customer/edit/' + req.body.id)
} else {
    
   let newfeilds = {
       Fname: req.body.firstname,
       LName: req.body.lastname,
       Contact: req.body.contact,
       Email: req.body.email,
   }
   let query = {_id: req.body.id}

   Customer.updateOne(query, newfeilds, (err)=> {
       if(!err) {
           req.flash('success', " The customer was updated successfuly"),
           res.redirect('/customer/edit/' + req.body.id)
       } else {
           console.log(err)
       }
   })
}

}

/**
* render customer
*
* @param req
* @param res
*/
exports.render_customer = function(req,res) {
    res.render('customer/new', {
        errors: req.flash('errors'),
        error: req.flash('error'),
        title: "New customer"
    })
}

/**
* delete customer by id
*
* @param req
* @param res
*/
exports.delete_customer_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Customer.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The customer was deleted successfuly")
            res.redirect('/customer/all')
        } else {
            req.flash('error', 'customer delete error')
            res.redirect('/customer/single/' + req.params.id)
        }
    })
    
}