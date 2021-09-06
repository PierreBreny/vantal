const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Database

// Mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true})

// Routes
app.use("/", (req, res) => {
    res.send("This is working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on 8080");
}); 