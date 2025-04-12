//1.Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const moment =require("moment")
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

require("dotenv").config();

//import users model
const Signup = require("./models/Signup"); // Assuming Signup.js is in the models folder

//2. instantiations
const app = express();
const PORT = 3333;

//import routes
const childRoutes = require("./routes/childRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");


//3. configurations
//setting up how it should connect(connecting to what is in your .env file)
app.locals.moment = moment;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//testing the connection
mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//4.middleware
app.use(express.static(path.join(__dirname, "public"))); //specifies a folder for static files
app.use(express.urlencoded({ extended: true })); //this helps to parse data from the form

// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());

//5. routes
//using imported routes
app.use("/", childRoutes);
app.use("/", authRoutes);
app.use("/", adminRoutes);




//redirection to unavailable page
app.get("*", (req, res) => {
  res.send("oops! page not found");
});

//6. bootstraping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
