/**
* call library
*/
const Chef = require('../models/Chef')
const { check, validationResult } = require('express-validator/check')

/**
* new chef
*
* @param req
* @param res
*/
exports.new_chef = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/chef/new')
    } else {
        
       Chef.findOne({Email: req.body.email}, (err,chef)=> {
        
        if(err) {

            if(req.body.birthdate != ""){
                
            let newChef = new Chef({
                Fname: req.body.firstname,
                LName: req.body.lastname,
                Email: req.body.email,
                Experience: req.body.experience,
                Type: req.body.type,
                City : req.body.city,
                Postcode : req.body.postcode,
                Salary: req.body.salary,
                Sex: req.body.sex,
                Birthdate: req.body.birthdate,
                created_at: Date.now(),
            })

        newChef.save( (err)=> {
            if(!err) {
                req.flash('success', ' The chef was created successfuly')
                res.redirect('/chef/all')
            } else {
                console.log(err)
            } 
        })
        
    } else {
        req.flash('error', 'birthdate is empty')
        res.redirect('/chef/new')
    }
    } else {
        req.flash('error', 'Email already exists')
        res.redirect('/chef/new')
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
exports.all_chef = function(req,res) {

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
    Chef.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Chef.find({},{},q, (err,chef)=> {
        if(!err){
         res.render('chef/index', {
             chef : chef,
             total : parseInt(totalDocs),
             page : page,
             title : "All chefs",
             success: req.flash('success')
         })
        } else {
            res.redirect('/chef/new')
        }
    }).sort({created_at:'desc'}); 
  
})
}

/**
* get chef by id
*
* @param req
* @param res
*/
exports.find_chef_by_id = function(req,res) {
    Chef.findOne({_id: req.params.id}, (err,chef)=> {
        
        if(!err) {
            
         res.render('chef/single', {
             chef: chef,
             title: "single chef"
         })
 
        } else {
            console.log(err)
        }
     
     })
}

/**
* edit chef by id
*
* @param req
* @param res
*/
exports.edit_chef_by_id = function(req,res) {

    let salary  = [0,100,200,300,400,500,600,700,800,900,1000]
    let city  = ['Adrar','Aïn Defla','Aïn Témouchent','Alger','Annaba','Batna','Béchar','Béjaïa','Biskra','Blida','Bordj Bou Arréridj','Bouira','Boumerdès','Chlef','ConstantineDjelfa','El Bayadh','El Oued','El Tarf','Ghardaïa','Guelma','Illizi','Jijel','Khenchela','Laghouat','MSila','Mascara','Médéa','Mila','Mostaganem','Naama','Oran','Ouargla','Oum el Bouaghi','Relizane','Saïda','Sétif','Sidi Bel Abbès','Skikda','Souk Ahras','Tamanrasset','Tébess','Tiaret','Tindouf','Tipaza','Tissemsilt','Tizi Ouzou','Tlemcen']

    Chef.findOne({_id: req.params.id}, (err,chef)=> {
        
        if(!err) {
       
         res.render('chef/edit', {
            salary  : salary,
            city    : city,
            chef: chef,
            title: "edit chef",
            errors: req.flash('errors'),
            success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update chef by id
*
* @param req
* @param res
*/
exports.update_chef_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/chef/edit/' + req.body.id)
    } else {
       let newfeilds = {
        Fname: req.body.firstname,
        LName: req.body.lastname,
        Email: req.body.email,
        Experience: req.body.experience,
        Type: req.body.type,
        City : req.body.city,
        Postcode : req.body.postcode,
        Salary: req.body.salary,
        Sex: req.body.sex,
        Birthdate: req.body.birthdate,
       }
       let query = {_id: req.body.id}

            Chef.updateOne(query, newfeilds, (err)=> {
                if(!err) {
                    req.flash('success', " The chef was updated successfuly"),
                    res.redirect('/chef/edit/' + req.body.id)
                } else {
                    console.log(err)
                }
            })

    }
   
}

/**
* render chef
*
* @param req
* @param res
*/
exports.render_chef = function(req,res) {
    let city  = ['Adrar','Aïn Defla','Aïn Témouchent','Alger','Annaba','Batna','Béchar','Béjaïa','Biskra','Blida','Bordj Bou Arréridj','Bouira','Boumerdès','Chlef','ConstantineDjelfa','El Bayadh','El Oued','El Tarf','Ghardaïa','Guelma','Illizi','Jijel','Khenchela','Laghouat','MSila','Mascara','Médéa','Mila','Mostaganem','Naama','Oran','Ouargla','Oum el Bouaghi','Relizane','Saïda','Sétif','Sidi Bel Abbès','Skikda','Souk Ahras','Tamanrasset','Tébess','Tiaret','Tindouf','Tipaza','Tissemsilt','Tizi Ouzou','Tlemcen']
        res.render('chef/new',{
            city:city,
            title:"new chef",
            errors: req.flash('errors'),
            error: req.flash('error')
        })
}

/**
* delete chef by id
*
* @param req
* @param res
*/
exports.delete_chef_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Chef.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The chef was deleted successfuly")
            res.redirect('/chef/all')
        } else {
            req.flash('error', 'chef delete error')
            res.redirect('/chef/single/' + req.params.id)
        }
    })
    
}