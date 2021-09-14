const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 

// // User listings dashboard -> If user has none, page is empty and button redirects to 'listings/new'
// router.get('/', ensureAuthenticated, (req,res) =>{
//     res.render('myListing', {
//         user: req.user,
//         profile: req.user.profile
//     });
// })

// Create new listing page
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
        res.redirect('/dashboard/');
    } catch (error) {
        console.log(error);
        res.redirect('/listings/new');
    }
})


// Display all listings
const getProfileAndPopulate = function(id){
    return Profile.findById(id).populate('listings')
}

const renderListings = async function (req, res){
    listings = await getProfileAndPopulate(req.user.profile._id)
    console.log(listings)
    res.render('myListing',{
        user: req.user,
        listings: listings
    });
}

//dashboard page with all listings rendered
router.get('/',ensureAuthenticated,(req,res)=>{
    renderListings(req, res);
})

module.exports = router; 