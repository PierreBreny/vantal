const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const Listing = require('../models/listing').Listing;
const Profile = require("../models/profile").Profile;
const cron = require("node-cron");

// cron provides a way to repeat a task at a specific time interval
cron.schedule("* * * * *", function() {
    // 1. check if listings are available:
    // -> (write a function to see if today's date is between a listing start_date and end_date)
    // 2. Add a Not available tag to the listings that are unavailable 
    console.log("He asked me to say hi in the console, so.. Hi !");
})


// Homepage with listings

router.get('/', (req,res) => {
    Listing.find({}, (err, listings) => {
        res.render('welcome', {
            req: req,
            user: req.user,
            listings: listings
        })
    })
})

// Search endpoint
router.get('/search', async (req,res) => {
    try {
        let result = await Listing.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${req.query.term}`,
                        "path": "city",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }  
        ]);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


//register page
router.get('/register', (req,res)=>{
    res.render('users/register');
})

//dashboard page with all listings rendered

router.get('/dashboard', ensureAuthenticated, (req,res) => {
    Listing.find({}, (err, listings) => {
        res.render('dashboard', {
            req: req,
            user: req.user,
            listings: listings
        })
    })
})



//account page with all user info
router.get('/account',ensureAuthenticated,(req,res)=>{
    res.render('users/account',{
        user: req.user,
    });;
})

module.exports = router; 