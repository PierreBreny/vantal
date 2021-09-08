const express = require('express');
const router  = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const {ensureAuthenticated} = require('../config/auth'); 
const { update } = require('../models/profile');

//profile page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.user
    });
})
//new profile page
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


module.exports = router; 