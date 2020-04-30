/**
* call library
*/
const Booking = require('../models/Booking');
const Customer = require('../models/Customer')
const { check, validationResult } = require('express-validator/check')

/**
* new booking
*
* @param req
* @param res
*/
exports.new_booking = function(req,res) {

        Customer.findOne({CustomerID: req.body.customerID}, (err,customer)=> {
            
            if(!err) {

                let newBooking = new Booking({
                    Date: req.body.date,
                    time: req.body.time,
                    number_place: req.body.number_place,
                    CustomerID:req.body.customerID,
                    created_at: Date.now()
                })

                if(req.body.date != ""){

                    newBooking.save( (err)=> {
                        if(!err) {
                            req.flash('success', ' The booking was created successfuly')
                            res.redirect('/booking/all')
                        } else {
                            console.log(err)
                        } 
                    })
                } else {
                    req.flash('error', 'Date is empty')
                    res.redirect('/booking/new')
                }

            } else {
                console.log(err)
            }
        
         })

}

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_booking = function(req,res) {
    
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
    Booking.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Booking.find({},{},q, (err,booking)=> {
        if(!err){
         res.render('booking/index', {
            booking : booking,
            total : parseInt(totalDocs),
            page : page,
            title : "All booking",
            success: req.flash('success')
         })
        } else {
            res.redirect('/booking/new')
        }
    }).sort({created_at:'desc'}); 
})
}

/**
* get booking by id
*
* @param req
* @param res
*/
exports.find_booking_by_id = function(req,res) {
    Booking.findOne({_id: req.params.id}, (err,booking)=> {
        
        if(!err) {
            
         res.render('booking/single', {
             booking: booking,
             title: "single booking",
         })
 
        } else {
            console.log(err)
        }
     
     })
}

/**
* edit booking by id
*
* @param req
* @param res
*/
exports.edit_booking_by_id = function(req,res) {
    
   let time = ["6:00am","6:30am","7:00am","7:30am","8:00am","8:30am","9:00am","9:30am","10:00am","10:30am","11:00am","11:30am","12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm","4:00pm","4:30pm","5:00pm","5:30pm","6:00pm","6:30pm","7:00pm","7:30pm","8:00pm","8:30pm","9:00pm","9:30pm","10:00pm","10:30pm","11:00pm","11:30pm"]
   let number_place = [1,2,3,4,5,6,7,8,9,10]

    Booking.findOne({_id: req.params.id}, (err,booking)=> {
        if(!err) {
            Customer.find({}, (err,customer)=> {
             if(!err) {
         res.render('booking/edit', {
             number_place: number_place,
             time: time,
             customer: customer,
             booking: booking,
             title: "edit booking",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
        
        } else {
            console.log(err)
        }
    })
} else {
    console.log(err)
}
     
     })
}

/**
* update booking by id
*
* @param req
* @param res
*/
exports.update_booking_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/booking/edit/' + req.body.id)
    } else {

       let newfeilds = {
        CustomerID: req.body.customerID,
        Date: req.body.date,
        time: req.body.time,
        number_place: req.body.number_place,
        created_at: Date.now(),
       }
       let query = {_id: req.body.id}

       Booking.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The booking was updated successfuly"),
               res.redirect('/booking/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
   
}

/**
* render booking
*
* @param req
* @param res
*/
exports.render_booking = function(req,res) {
    let time = ["6:00am","6:30am","7:00am","7:30am","8:00am","8:30am","9:00am","9:30am","10:00am","10:30am","11:00am","11:30am","12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm","4:00pm","4:30pm","5:00pm","5:30pm","6:00pm","6:30pm","7:00pm","7:30pm","8:00pm","8:30pm","9:00pm","9:30pm","10:00pm","10:30pm","11:00pm","11:30pm"]
    let number_place = [1,2,3,4,5,6,7,8,9,10]
    
    Customer.find({}, (err,customer)=> {
     if(!err) {
     res.render('booking/new', {
         customer: customer,
         number_place:number_place,
         time:time,
         title:"New booking",
         errors: req.flash('errors'),
         error: req.flash('error')
     })
    }
    })
}

/**
* delete booking by id
*
* @param req
* @param res
*/
exports.delete_booking_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Booking.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The booking was deleted successfuly")
            res.redirect('/booking/all')
        } else {
            req.flash('error', 'booking delete error')
            res.redirect('/booking/single/' + req.params.id)
        }
    })
    
}