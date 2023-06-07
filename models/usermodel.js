const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userScheme = new mongoose.Schema({
    name : String,
    email : String,
    password : {
        type : String,
        select : false // password가 누군가에게 보여지길 원하지 않음
    },

    resetPasswordToken : String,
    resetPasswordExpires : Date
})

userScheme.plugin(passportLocalMongoose, {usernameField : 'email'});
module.exports = mongoose.model('User', userScheme);