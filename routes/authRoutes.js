const express = require("express");
const router = express.Router();
const passport = require("passport");

//import models
const Signup = require("../models/Signup");
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(400).send("Not registererd, Email already in use");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login");
      });
    }
    console.log(user);
  } catch (error) {
    res.status(400).render("signup");
    console.log(error);
  }
});

//login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.body);
    req.session.user = req.user;
    if (req.user.role === "director") {
      res.redirect("/dash")
    }
   
  }
);

router.get("/logout", (req, res) => {
  if(req.session){
    req.session.destroy((error)=>{
      if(error){
        return res.status(500).send(error , "Error logging out")
      }
      res.redirect("/");
    })}
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/usertable", async(req, res) => {
  try {
    const users =await Signup.find().sort({$natural:-1});
    res.render("userslist" , {
      sales:users
    })

  } catch (error) {
    res.status(400).send("unable to find users in the db")
  }

});


module.exports = router;
