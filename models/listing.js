const mongoose = require('mongoose');
const ListingSchema  = new mongoose.Schema({
    model :{
        type  : String,
        required : true
    } ,
    year :{
        type  : Number,
        required : true
    } ,
    description :{
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
    },
    city: {
        type : String,
        required: true
    }
});
const Listing = mongoose.model('Listing',ListingSchema);

module.exports = {Listing, ListingSchema};