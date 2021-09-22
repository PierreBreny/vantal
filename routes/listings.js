const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 

// Form to create a new listing
router.get('/new', ensureAuthenticated, (req,res) =>{
    res.render('listings/newListing', {
        user: req.user
    });
})

// Handle new listing creation
router.post('/new', ensureAuthenticated, async (req,res) => {
    const newListing = new Listing(req.body)

    try {
        await newListing.save()
        await Profile.findOneAndUpdate({_id: req.user.profile._id}, {$push: {listings: newListing._id}})
        res.redirect(`/listings/${newListing._id}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/listings/${newListing._id}`);
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
    res.render('listings/myListings',{
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

// UPDATE listing by ID form

router.get('/:id/edit', async (req,res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    res.render('listings/edit', {listing})
})

// UPDATE listing
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    res.redirect(`/listings/${listing._id}`);
})

module.exports = router; 