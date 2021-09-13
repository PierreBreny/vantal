const express = require('express');
const router  = express.Router();
const Listing = require("../models/cart").ItemSchema;
const User = require("../models/user");
const {ensureAuthenticated} = require('../config/auth'); 

// Listings dashboard -> If user has none, page is empty and button redirects to 'listings/new'
router.get('/',(req,res)=>{
    res.render('listing');
})

//Create a new listing
router.get('/new', (req,res) => {
    res.render('newListing');
})

module.exports = router; 