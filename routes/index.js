const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const Listing = require('../models/listing').Listing;
const Profile = require("../models/profile").Profile;


// function to render welcome with listings AND login option

router.get('/', (req,res) => {
    Listing.find({}, (err, listings) => {
        res.render('welcome', {
            req: req,
            user: req.user,
            listings: listings
        })
    })
})
//register page
router.get('/register', (req,res)=>{
    res.render('users/register');
})

//dashboard page with all listings rendered


router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user,
        listings: listings
    });
})

//account page with all user info
router.get('/account',ensureAuthenticated,(req,res)=>{
    res.render('users/account',{
        user: req.user,
    });;
})

module.exports = router; 