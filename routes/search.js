const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 


// Create new listing page
router.get('/', (req,res)=>{
    res.render('search');
})

module.exports = router; 