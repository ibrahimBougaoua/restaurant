const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

/**
* User Schema
*/
const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'table'
    },
    created_at: {
        type: Date,
        required: true
    },
    
})

// hash password
userSchema.methods.hashSyncPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// compare password
userSchema.methods.compareSyncPass = (password, hash) => {
    return bcrypt.compareSync(password,hash)
}

// check if admin
userSchema.methods.isAdmin = function() {
    return (this.role == 'adminstrator')
}

// check if admin
userSchema.methods.isCustomer = function() {
    return (this.role == 'customer')
}


// check if admin
userSchema.methods.isWaiter = function() {
    return (this.role == 'waiter')
}


// check if chef editor
userSchema.methods.isChef = function() {
    return (this.role === "chef")
}

// check if table editor
userSchema.methods.isTable = function() {
    return (this.role == 'table')
}

// check if bill editor
userSchema.methods.isBill = function() {
    return (this.role == 'bill')
}

// check if booking editor
userSchema.methods.isBooking = function() {
    return (this.role == 'booking')
}

// check if Food & Drink editor
userSchema.methods.isFooDrink = function() {
    return (this.role == 'foodrink')
}

let User = mongoose.model('User', userSchema, 'users')

module.exports = User