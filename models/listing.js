const mongoose = require('mongoose');
const ListingSchema  = new mongoose.Schema({
    listing_title :{
        type  : String,
        required : true
    } ,
    listing_description :{
        type  : String,
        required : true
    } ,
    van_img :{
        type  : String,
        required : false
    } ,
    van_price :{
        type  : Number,
        required : true
    }
});
const Listing = mongoose.model('Listing',ListingSchema);

module.exports = {Listing, ListingSchema};