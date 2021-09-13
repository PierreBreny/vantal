const mongoose = require('mongoose');
const ProfileSchema = require('./profile').ProfileSchema;

const UserSchema  = new mongoose.Schema({
    name :{
        type  : String,
        required : true
    } ,
    email :{
        type  : String,
        required : true
    } ,
    password :{
        type  : String,
        required : true
    } ,
    date :{
        type : Date,
        default : Date.now
    } ,
    profile : ProfileSchema,
    // bookings: BookingSchema,
    // listing: ListingSchema,
    // cart: CartSchema

});

const User= mongoose.model('User', UserSchema);

module.exports = User;