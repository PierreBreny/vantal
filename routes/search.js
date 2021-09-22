const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 


// Search page
router.get('/', (req,res)=>{
    // const specific_city = city-query
    // if user query === specific-city
    // then display listings from db that are equals to that city
    // then render search page with results
    res.render('search');
})

// router.post('/', (req,res)=>{
//     const {city, start_date, start_time, end_date, end_time} = req.body;
//     console.log('City: ' +city+ ' Start Date: ' +start_date+ ' Start time: ' +start_time+ ' End date: ' +end_date+ ' End time: ' +end_time)
//     res.render('search');
// })

// Display results



module.exports = router; 