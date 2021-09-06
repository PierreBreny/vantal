const express = require("express");
const mongoose = require("mongoose");
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")
const dotenv = require('dotenv');
dotenv.config();

// passport config

// Database

// Mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err))

// Routes
app.use("/", (req, res) => {
    res.send("This is working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on 8080");
}); 