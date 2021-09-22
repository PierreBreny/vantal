const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 

// Form to create a new listing
router.get('/new', ensureAuthenticated, (req,res) =>{
    res.render('newListing', {
        user: req.user
    });
})

// Handle new listing creation
router.post('/new', ensureAuthenticated, async (req,res) => {
    const newListing = new Listing(req.body)

    try {
        await newListing.save()
        await Profile.findOneAndUpdate({_id: req.user.profile._id}, {$push: {listings: newListing._id}})
        res.redirect('/listings');
    } catch (error) {
        console.log(error);
        res.redirect('/listings/new');
        // "Vantastic!" could be displayed when a user list a van
    }
})

// Display listings linked to a specific profile
const getProfileAndPopulate = function(id){
    return Profile.findById(id).populate('listings')
}

const renderListings = async function (req, res){
    listings = await getProfileAndPopulate(req.user.profile._id)
    console.log(listings.listings)
    res.send('myListing',{
        user: req.user,
        listings: listings
    });
}

router.get('/',ensureAuthenticated,(req,res)=>{
    renderListings(req, res);
})

// GET listing by ID

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    res.render('listings/show', {listing})
})


module.exports = router; 