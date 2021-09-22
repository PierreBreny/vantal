const mongoose = require('mongoose');
const TripSchema  = new mongoose.Schema({
    
    listing :{
        type  : Number,
        required : true
    },
    start_date :{
        type  : Date,
        required : true
    } ,
    end_date :{
        type  : Date,
        required : true
    } ,
    price :{
        type  : Number,
        required : false
        // has to be required but for now it is set as default to avoid app crashing
    } ,
    city :{
        type  : String,
        required : true
    }
});
const Trip = mongoose.model('Trip',TripSchema);

module.exports = {Trip, TripSchema};