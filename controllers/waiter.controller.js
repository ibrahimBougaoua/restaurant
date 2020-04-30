/**
* call library
*/
const Waiter = require('../models/Waiter')
const { check, validationResult } = require('express-validator/check')

/**
* new wiater
*
* @param req
* @param res
*/
exports.new_waiter = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/waiter/new')
    } else {
        
        Waiter.findOne({Email: req.body.email}, (err,waiter)=> {
        
            if(!waiter) {

        let newWaiter = new Waiter({
            Fname: req.body.firstname,
            LName: req.body.lastname,
            Email: req.body.email,
            City : req.body.city,
            Postcode : req.body.postcode,
            Salary: req.body.salary,
            Sex: req.body.sex,
            Birthdate: req.body.birthdate,
            created_at: Date.now()
        })


        if(req.body.birthdate != ""){
        newWaiter.save( (err)=> {
            if(!err) {
                req.flash('success', ' The waiter was created successfuly')
                res.redirect('/waiter/all')
            } else {
                console.log(err)
            } 
        })
    } else {
    req.flash('error', 'Date is empty')
    res.redirect('/waiter/new')
}
    } else {
        req.flash('error', 'Email already exists')
        res.redirect('/waiter/new')
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
exports.all_waiter = function(req,res) {

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
    Waiter.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Waiter.find({},{},q, (err,waiter)=> {
        if(!err){
         res.render('waiter/index', {
             waiter : waiter,
             total : parseInt(totalDocs),
             page : page,
             title : "All waiter",
             success: req.flash('success')
         })
        } else {
            res.redirect('/user/new')
        }
    }).sort({created_at:'desc'}); 
})

}

/**
* get waiter by id
*
* @param req
* @param res
*/
exports.find_waiter_by_id = function(req,res) {
    Waiter.findOne({_id: req.params.id}, (err,waiter)=> {
        
        if(!err) {
            
         res.render('waiter/single', {
             waiter: waiter,
             title: "single waiter"
         })
 
        } else {
            console.log(err)
        }
     
     })
}

/**
* edit waiter by id
*
* @param req
* @param res
*/
exports.edit_waiter_by_id = function(req,res) {

    let salary  = [0,100,200,300,400,500,600,700,800,900,1000]
    let city  = ['Adrar','Aïn Defla','Aïn Témouchent','Alger','Annaba','Batna','Béchar','Béjaïa','Biskra','Blida','Bordj Bou Arréridj','Bouira','Boumerdès','Chlef','ConstantineDjelfa','El Bayadh','El Oued','El Tarf','Ghardaïa','Guelma','Illizi','Jijel','Khenchela','Laghouat','MSila','Mascara','Médéa','Mila','Mostaganem','Naama','Oran','Ouargla','Oum el Bouaghi','Relizane','Saïda','Sétif','Sidi Bel Abbès','Skikda','Souk Ahras','Tamanrasset','Tébess','Tiaret','Tindouf','Tipaza','Tissemsilt','Tizi Ouzou','Tlemcen']

    Waiter.findOne({_id: req.params.id}, (err,waiter)=> {
        
        if(!err) {
       
         res.render('waiter/edit', {
             salary  : salary,
             city    : city,
             waiter: waiter,
             title: "edit waiter",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update waiter by id
*
* @param req
* @param res
*/
exports.update_waiter_by_id = function(req,res) {
   
    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/waiter/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
        Fname: req.body.firstname,
        LName: req.body.lastname,
        Email: req.body.email,
        City : req.body.city,
        Postcode : req.body.postcode,
        Salary: req.body.salary,
        Sex: req.body.sex,
        Birthdate: req.body.birthdate,
       }
       let query = {_id: req.body.id}

       Waiter.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The Waiter was updated successfuly"),
               res.redirect('/waiter/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
   
}

/**
* render waiter
*
* @param req
* @param res
*/
exports.render_waiter = function(req,res) {
    let city  = ['Adrar','Aïn Defla','Aïn Témouchent','Alger','Annaba','Batna','Béchar','Béjaïa','Biskra','Blida','Bordj Bou Arréridj','Bouira','Boumerdès','Chlef','ConstantineDjelfa','El Bayadh','El Oued','El Tarf','Ghardaïa','Guelma','Illizi','Jijel','Khenchela','Laghouat','MSila','Mascara','Médéa','Mila','Mostaganem','Naama','Oran','Ouargla','Oum el Bouaghi','Relizane','Saïda','Sétif','Sidi Bel Abbès','Skikda','Souk Ahras','Tamanrasset','Tébess','Tiaret','Tindouf','Tipaza','Tissemsilt','Tizi Ouzou','Tlemcen']
    Waiter.find({}, (err,waiter)=> {
        if(!err){
              res.render('waiter/new', {
                  city : city,
                  waiter : waiter,
                  title : "New waiter",
                  errors: req.flash('errors'),
                  error: req.flash('error')
              })
        }
    })
}

/**
* delete waiter by id
*
* @param req
* @param res
*/
exports.delete_waiter_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Waiter.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The waiter was deleted successfuly")
            res.redirect('/waiter/all')
        } else {
            req.flash('error', 'waiter delete error')
            res.redirect('/waiter/single/' + req.params.id)
        }
    })
    
}