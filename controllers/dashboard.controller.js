/**
* call library
*/
const Customer = require('../models/Customer')
const User = require('../models/User')
const Waiter = require('../models/Waiter')
const Chef = require('../models/Chef')
const Booking = require('../models/Booking')
const Table = require('../models/Table')
const Bill = require('../models/Bill')
const Food = require('../models/Food')
const Drink = require('../models/Drink')

/**
* count total documents for each Doc
*
* @param req
* @param res
*/
exports.render_dashboard_count = function(req,res) {
    User.countDocuments({},(err,userTotal)=>{
        Waiter.countDocuments({},(err,waiterTotal)=>{
            Customer.countDocuments({},(err,customerTotal)=>{
                    Chef.countDocuments({},(err,chefTotal)=>{
                            Table.countDocuments({},(err,tableTotal)=>{
                                Food.countDocuments({},(err,foodTotal)=>{
                                    Drink.countDocuments({},(err,drinkTotal)=>{
                                        Bill.countDocuments({},(err,billTotal)=>{
                                            Booking.countDocuments({},(err,bookingTotal)=>{
                                            res.render('dashboard/dashboard', {
                                                userTotal : userTotal,
                                                waiterTotal : waiterTotal,
                                                customerTotal : customerTotal,
                                                chefTotal : chefTotal,
                                                tableTotal : tableTotal,
                                                foodTotal : foodTotal,
                                                drinkTotal : drinkTotal,
                                                billTotal : billTotal,
                                                bookingTotal : bookingTotal,
                                                title : "Dashboard",
                                                success: req.flash('success')
                                            })
                                        })
                                        })
                                    })
                                })
                            })
                    })
            })
        })
    })
}