const express = require('express');
const router  = express.Router();
const Listing = require("../models/listing").Listing;
const Profile = require("../models/profile").Profile;
const {ensureAuthenticated} = require('../config/auth');

const models = ["Baolong Pegasus", "Barkas B 1000", "Barkas V 901/2", "Bertone Genesis", "Bestune NAT", "Bisu M3", "Buick GL6","Buick GL8", "Buick Terraza", "BYD D1", "BYD M3 DM", "BYD M6", "BYD Song Max", "Changan Joice", "Changan Ruixing M80", "Changan Ruixing M90", "Changhe Freedom M70", "Changhe Freedom M70", "Changhe M70", " Chery V5", "Chevrolet Astro", "Chevrolet Lumina APV", "Chevrolet Uplander", "Chevrolet Venture", "Chevrolet Zafira", "Chrysler 700C", "Chrysler ecoVoyager", "Chrysler Pacifica", "Chrysler Town & Country", "Chrysler Voyager", "Daihatsu Luxio", "DFSK C-Series", "DFSK K-Series", "DKW Schnellaster", "Dodge Caravan", "Dodge Mini Ram", "Dongfeng Fengguang 330", "Dongfeng Fengguang 330S", "Dongfeng Fengguang 370", "Dongfeng Fengxing CM7", "Dongfeng Fengxing Lingzhi", "Dongfeng Succe", "Eicher Polaris Multix", "Enranger 727", "Enranger 737", "Eurovans", "FAW Freewind", "Ford Aerostar", "Ford Carousel", "Ford Freda", "Ford Galaxy", "Ford S-Max", "Ford Transit Custom", "Ford Windstar", "Foton Gratour im6", "Foton Gratour im8", "Foton Gratour ix5", "Geely Jiaji", "Goliath GV800", "Gutbrod Atlas", "Haima 7X", "Haima F7", "Haima Freema", "Hanteng V7", "Honda Elysion", "Honda Freed", "Honda LaGreat", "Honda Odyssey", "Honda Stream", "Huansu H2", "Huansu H3", "Huansu H5", "Huansu H6", "Huasong 7", "Hyundai Custo", "Hyundai Santamo", "Hyundai Trajet", "JAC Refine", "Jinbei 750", "Jinbei F50", "Joylong EF5", "Joylong EF9", "Joylong iFly", "Karry K50", "Keyton EX80", "Kia Carnival", "King Long Kairui", "Lancia Phedra", "Landwind CV9", "Lexus LM", "Lifan Xuanlang", "Lloyd LT 500", "Luxgen M7", "Mazda Biante", "Mazda Bongo", "Mazda MPV", "Mazda Premacy", "Mercedes-Benz R-Class", "Mercedes-Benz Vaneo", "Mercury Villager", "Volkswagen Microbus", "Mitsubishi Chariot", "Mitsubishi Delica", "Mitsubishi Grandis", "Mitsubishi Savrin", "Nissan Bassara", "Nissan Elgrand", "Nissan Forum", "Nissan Lafesta", "Nissan Livina", "Nissan Prairie", "Nissan Presage", "Nissan Quest", "Nissan Serena", "Oldsmobile Silhouette", "Opel Sintra", "Oshan Cosmos", "Peugeot 806", "Peugeot 807", "Plymouth Voyager", "Pontiac Montana", "Pontiac Trans Sport", "Proton Exora", "Refine M6", "Renault Espace", "Renault Scénic", "Roewe iMAX8", "Saturn Relay", "SEAT Alhambra", "Shanxi Hangtian Victory", "SsangYong Rodius", "Stout Scarab", "Subaru Exiga", "Subaru Traviq", "Suzuki APV", "Suzuki Landy", "Tata Magic", "Tata Venture", "Toyota Alphard", "Toyota Gaia", "Toyota Isis", "Toyota LiteAce", "Toyota Mark", "Toyota Nadia", "Toyota Noah", "Toyota Previa", "Toyota Sienna", "Toyota Sienta", "Trumpchi GM6", "Trumpchi GM8", "Vauxhall Zafira", "Venucia M50V", "Volkswagen California", "Volkswagen Caravelle", "Volkswagen I.D. Buzz", "Volkswagen Routan", "Volkswagen Sharan", "Volkswagen Transporter", "Volkswagen Type 2", "Volkswagen Viloran", "Wuling Hongtu", "Wuling Rongguang", "Wuling Victory", "Yema Spica", "Zotye V10"];
const years = [1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
// Form to create a new listing
router.get('/new', ensureAuthenticated, (req,res) =>{
    res.render('listings/newListing', {
        user: req.user,
        models: models,
        years: years
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

// Display Profile listings
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
    res.render('listings/edit', {listing, models, years})
})

// UPDATE listing
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    res.redirect(`/listings/${listing._id}`);
})

// DELETE Listing

module.exports = router; 