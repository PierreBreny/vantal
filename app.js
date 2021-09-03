const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database

// Mongoose
mongoose.connect("mongodb+srv://vantal:vantal123@cluster0.eu4l9.mongodb.net/vantal?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology : true})

// Routes
app.use("/", (req, res) => {
    res.send("This is working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on 3000");
}); 