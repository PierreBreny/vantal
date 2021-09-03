const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database

// Mongoose
mongoose.connect(, {useNewUrlParser: true, useUnifiedTopology : true})

// Routes
app.use("/", (req, res) => {
    res.send("This is working!")
})

app.listen(8080, () => {
    console.log("Listening on 3000");
}); 