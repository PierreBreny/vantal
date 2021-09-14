const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 

// Listings dashboard -> If user has none, page is empty and button redirects to 'listings/new'
router.get('/', ensureAuthenticated, (req,res) =>{
    res.render('listing', {
        user: req.user
    });
})

router.get('/new', ensureAuthenticated, (req,res) =>{
    res.render('newListing', {
        user: req.user
    });
})

//Create a new listing
router.post('/new', ensureAuthenticated, async (req,res) => {
    const newListing = new Listing(req.body)

    try {
        await newListing.save()
        await Profile.findOneAndUpdate({_id: req.user.profile._id}, {$push: {listings: newListing._id}})
        res.redirect('/listings/');
    } catch (error) {
        console.log(error);
        res.redirect('/listings/new');
    }
})

module.exports = router; 