const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth'); 
const Profile = require("../models/profile").Profile;
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})

//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

//dashboard page with all listings rendered
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user,
    });;
})

module.exports = router; 