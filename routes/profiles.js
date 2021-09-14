const express = require('express');
const router  = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const {ensureAuthenticated} = require('../config/auth'); 
// const { update } = require('../models/profile');

// Profile page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.user
    });
})

// Create new profile
router.get('/new', ensureAuthenticated, (req,res) => {
    res.render('newProfile', {
        user: req.user
    });
})


// Create new profile
router.post('/new',async (req,res) => {
    const newProfile = new Profile(req.body)
        // 
    try {
        await newProfile.save()
        await User.findOneAndUpdate({_id: req.user._id}, {profile: newProfile});
        res.redirect('/profiles/');
    } catch (error) {
        console.log(error);
        res.redirect('/profiles/new');
    }
    })




// Delete Profile

// Actually, this does not delete the profile; it still exists in the profile collection. 
// But, I can then offer the opportunity to the user to recover his or her profile 
// by pushing the existing profile (by id) to the corresponding user.

router.get('/delete', ensureAuthenticated, async (req, res) => {
    try {
        await User.findOneAndUpdate({_id: req.user._id},{profile: null});
        // await User.save()
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.redirect('/dashboard');
    }
})


module.exports = router; 