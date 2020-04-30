/**
* call library
*/
const Table = require('../models/Table');
const { check, validationResult } = require('express-validator/check')

/**
* new table
*
* @param req
* @param res
*/
exports.new_table = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/table/new')
    } else {
        
        let newTable = new Table({
            Name: req.body.name,
            NumberPlace: req.body.numberplace,
            Type: req.body.type,
            Description : req.body.description,
            created_at: Date.now(),
        })

        newTable.save( (err)=> {
            if(!err) {
                req.flash('success', ' The table was created successfuly')
                res.redirect('/table/all')
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
exports.all_tables = function(req,res) {

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
    Table.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Table.find({},{},q,(err,table)=> {
        if(!err){
         res.render('table/index', {
             table : table,
             total : parseInt(totalDocs),
             page : page,
             title : "All table",
             success: req.flash('success')
         })
        } else {
            res.redirect('/drink/new')
        }
    }).sort({created_at:'desc'}); 
})

}

/**
* get table by id
*
* @param req
* @param res
*/
exports.find_table_by_id = function(req,res) {

    Table.findOne({_id: req.params.id}, (err,table)=> {
        
        if(!err) {
            
         res.render('table/single', {
             table: table,
             title: "single table"
         })
 
        } else {
            console.log(err)
        }
     
     })
  

} 

/**
* edit table by id
*
* @param req
* @param res
*/
exports.edit_table_by_id = function(req,res) {

    let number_place = [1,2,3,4,5,6,7,8,9,10]
    Table.findOne({_id: req.params.id}, (err,table)=> {
        
        if(!err) {
       
         res.render('table/edit', {
             number_place: number_place,
             table: table,
             title: "edit table",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

} 

/**
* update table by id
*
* @param req
* @param res
*/
exports.update_table_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/table/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
        Name: req.body.name,
        NumberPlace: req.body.numberplace,
        Type: req.body.type,
        Description : req.body.description,
       }
       let query = {_id: req.body.id}

       Table.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The Table was updated successfuly"),
               res.redirect('/table/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }

} 

/**
* render table
*
* @param req
* @param res
*/
exports.render_table = function(req,res) {
    let number_place = [1,2,3,4,5,6,7,8,9,10]
    res.render('table/new', {
        number_place:number_place,
        title:"new table",
        errors: req.flash('errors')
    })
} 

/**
* delete table by id
*
* @param req
* @param res
*/
exports.delete_table_by_id = function(req,res) {

let query = {_id: req.body.id}

Table.deleteOne(query, (err)=> {
    if(!err) {
        req.flash('success', " The Table was deleted successfuly")
        res.redirect('/table/all')
    } else {
        req.flash('error', 'table delete error')
        res.redirect('/table/single/' + req.params.id)
    }
})

}