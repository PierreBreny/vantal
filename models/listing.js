const mongoose = require('mongoose');
const ListingSchema  = new mongoose.Schema({
    first_name :{
        type  : String,
        required : true
    } ,
    last_name :{
        type  : String,
        required : true
    } ,
    username :{
        type  : String,
        required : true
    } ,
    email :{
        type  : String,
        required : true
    } ,
    address :{
        type  : String,
        required : true
    } ,
    city :{
        type  : String,
        required : true
    } ,
    country :{
        type  : String,
        required : true
    } ,
    postal_code :{
        type  : String,
        required : true
    } ,
    about_user :{
        type  : String,
        required : true
    } ,
    date :{
        type  : Date,
        default : Date.now
    }
});
const Listing = mongoose.model('Listing',ListingSchema);

module.exports = {Listing, ListingSchema};