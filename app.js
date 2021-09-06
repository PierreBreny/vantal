const express = require("express");
const mongoose = require("mongoose");
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")
const dotenv = require('dotenv');
dotenv.config();

//passport config:
require('./config/passport')(passport)

// Mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on 8080");
}); 