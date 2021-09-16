const mongoose = require('mongoose');
const BookingSchema  = new mongoose.Schema({
    booking_title :{
        type  : String,
        required : true
    } ,
    booking_description :{
        type  : String,
        required : true
    } ,
    booking_img :{
        type  : String,
        required : false
    } ,
    booking_total :{
        type  : Number,
        required : true
    },
    date: {
        type : Date,
        default : Date.now
    }
});
const Booking = mongoose.model('Booking',BookingSchema);

module.exports = {Booking, BookingSchema};