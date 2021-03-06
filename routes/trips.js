const express = require('express');
const router  = express.Router();
const Trip = require("../models/trip").Trip;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth'); 

// // User listings dashboard -> If user has none, page is empty and button redirects to 'listings/new'
// router.get('/', ensureAuthenticated, (req,res) =>{
//     res.render('myListing', {
//         user: req.user,
//         profile: req.user.profile
//     });
// })

// Create new trip page
router.get('/new', ensureAuthenticated, (req,res) =>{
    res.render('trips/newTrip', {
        user: req.user
    });
})


//Create a new trip
router.post('/new', ensureAuthenticated, async (req,res) => {
    const newTrip = new Trip(req.body)

    try {
        await newTrip.save()
        await Profile.findOneAndUpdate({_id: req.user.profile._id}, {$push: {trips: newTrip._id}})
        res.redirect('/trips');
    } catch (error) {
        console.log(error);
        res.redirect('/trips/new');
        // "Vantastic!" must be displayed when a user book a van
    }
})


// Display all trips
const getProfileAndPopulate = function(id){
    return Profile.findById(id).populate('trips')
}

const renderTrips = async function (req, res){
    trips = await getProfileAndPopulate(req.user.profile._id)
    console.log(trips.trips)
    res.render('trips/myTrip',{
        user: req.user,
        trip: trips
    });
}

router.get('/',ensureAuthenticated,(req,res)=>{
    renderTrips(req, res);
})


// UPDATE trip by ID form

router.get('/:id/edit', async (req,res) => {
    const { id } = req.params;
    const trip = await Trip.findById(id)
    res.render('trips/edit', {trip})
})

// UPDATE listing
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    await Trip.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    res.redirect('/trips/');
})


// Get a trip by ID

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const trip = await Trip.findById(id)
    res.render('trips/show', {trip})
})

// Delete a trip

router.delete('/:id', ensureAuthenticated, async (req,res) => {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.redirect('/trips/');
    })


module.exports = router; 