/**
* call library
*/
const Bill = require('../models/Bill')
const Waiter = require('../models/Waiter')
const Food = require('../models/Food')
const Drink = require('../models/Drink')
const Table = require('../models/Table')
const Customer = require('../models/Customer')
const { check, validationResult } = require('express-validator/check')

/**
* new bill
*
* @param req
* @param res
*/
exports.new_bill = function(req,res) {

    const errors = validationResult(req)

    // check if no error detect
    if( ! errors.isEmpty() ) {        
        req.flash('errors',errors.array())
        res.redirect('/bill/new')
    } else {
        // create new bill object
        let newBill = new Bill({
            Sub_Total: req.body.sub_total,
            Vat: req.body.vat,
            Total : req.body.total,
            drink_id : req.body.drink,
            food_id : req.body.food,
            waiter_id : req.body.waiter,
            table_id : req.body.table,
            CustomerID : req.body.customerID,
            created_at: Date.now(),
        })

        // add data to database
        newBill.save( (err)=> {
            if(!err) {
                req.flash('success', 'The bill was created successfuly')
                res.redirect('/bill/all')
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
exports.all_bill = function(req,res) {
    
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
    // count total documents
    let totalDocs = 0
    Bill.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  
    // find data
    Bill.find({},{},q, (err,bill)=> {
        if(!err){
         res.render('bill/index', {
            bill : bill,
            total : parseInt(totalDocs),
            page : page,
            title : "All Bills",
            success: req.flash('success')
         })
        } else {
            res.redirect('/bill/new')
        }
    }).sort({created_at:'desc'}); 
})
  
}

/**
* find data by bill id
*
* @param req
* @param res
*/
exports.find_bill_by_id = function(req,res) {

    Bill.findOne({_id: req.params.id}, (err,bill)=> {
        Customer.findOne({_id: bill.CustomerID}, (err,customer)=> {
        if(!err) {
            
         res.render('bill/single', {
             bill: bill,
             customer: customer,
             title : "bill"
         })
 
        } else {
            console.log(err)
        }
     })
    })
  
}

/**
* edit bill by id
*
* @param req
* @param res
*/
exports.edit_bill_by_id = function(req,res) {
    
    Waiter.find({}, (err,waiter)=> {
        if(!err){
            Food.find({}, (err,food)=> {
                if(!err){
                    Drink.find({}, (err,drink)=> {
                        if(!err){
                            Table.find({}, (err,table)=> {
                                if(!err){
                                    Customer.find({}, (err,customer)=> {
                                        if(!err){
                                    Bill.findOne({_id: req.params.id}, (err,bill)=> {
                                        if(!err) {
                                         res.render('bill/edit', {
                                             waiter : waiter,
                                             food : food,
                                             drink : drink,
                                             table : table,
                                             customer : customer,
                                             bill: bill,
                                             title: "edit bill",
                                             errors: req.flash('errors'),
                                             success: req.flash('success')
                                         })
                                 
                                        } else {
                                            console.log(err)
                                        }
                                     
                                     })
                                    }
                                })
                            }
                        })
                        }
                    })
                }
            })
        }
    })

}

/**
* update bill by id
*
* @param req
* @param res
*/
exports.update_bill_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/bill/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
        Sub_Total: req.body.sub_total,
        Vat: req.body.vat,
        Total : req.body.total,
        drink_id : req.body.drink,
        food_id : req.body.food,
        waiter_id : req.body.waiter,
        table_id : req.body.table,
        CustomerID : req.body.customerID
       }
       let query = {_id: req.body.id}

       Bill.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The bill was updated successfuly"),
               res.redirect('/bill/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
}

/**
* render bill
*
* @param req
* @param res
*/
exports.render_bill = function(req,res) {
    
    Waiter.find({}, (err,waiter)=> {
        if(!err){
            Food.find({}, (err,food)=> {
                if(!err){
                    Drink.find({}, (err,drink)=> {
                        if(!err){
                            Table.find({}, (err,table)=> {
                                if(!err){
                                    Customer.find({}, (err,customer)=> {
                                        if(!err){
                                      res.render('bill/new', {
                                          waiter : waiter,
                                          food : food,
                                          drink : drink,
                                          table : table,
                                          customer : customer,
                                          title : "new bill",
                                          errors: req.flash('errors')
                                      })
                                    }
                                })
                            }
                        })
                        }
                    })
                }
            })
        }
    })
}

/**
* delete bill by id
*
* @param req
* @param res
*/
exports.delete_bill_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Bill.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', "The bill was deleted successfuly")
            res.redirect('/bill/all')
        } else {
            req.flash('error', 'bill delete error')
            res.redirect('/bill/single/' + req.params.id)
        }
    })
    
}