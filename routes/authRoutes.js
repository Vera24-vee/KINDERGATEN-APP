const express = require("express");
const router = express.Router();
const passport = require("passport");

//import models
const Signup = require("../models/Signup");
router.get("signup", (req, res) => {
  res.render("signup", { error: req.query.error, success: req.query.success });
});

router.post("signup", async (req, res) => {
  const { fname, lname, email, password, gender, address, role, phone } =
    req.body;
  if (!fname || !lname || !email || !password || !gender || !address || !role) {
    return res.redirect(
      "/auth/signup?error=" + encodeURIComponent("All fields are required.")
    );
  }
  // Simple email and password validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    return res.redirect(
      "/auth/signup?error=" + encodeURIComponent("Invalid email format.")
    );
  }
  if (password.length < 6) {
    return res.redirect(
      "/auth/signup?error=" +
        encodeURIComponent("Password must be at least 6 characters.")
    );
  }
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.redirect(
        "/auth/signup?error=" + encodeURIComponent("Email already in use")
      );
    } else {
      await Signup.register(user, password, (error) => {
        if (error) {
          return res.redirect(
            "/auth/signup?error=" +
              encodeURIComponent("Registration failed. Please try again.")
          );
        }
        return res.redirect(
          "/auth/signup?success=" +
            encodeURIComponent("Registration successful! Please log in.")
        );
      });
    }
  } catch (error) {
    res.redirect(
      "/auth/signup?error=" +
        encodeURIComponent("Registration failed. Please try again.")
    );
  }
});

//login route
router.get("login", (req, res) => {
  res.render("login", { error: req.query.error });
});

router.post(
  "login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.redirect(
        "/auth/login?error=" +
          encodeURIComponent("Email and password are required.")
      );
    }
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/auth/login?error=Invalid%20credentials",
  }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "director") {
      res.redirect("/dash");
    }
  }
);

router.get("logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send(error, "Error logging out");
      }
      res.redirect("/");
    });
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("usertable", async (req, res) => {
  try {
    const users = await Signup.find().sort({ $natural: -1 });
    res.render("userslist", {
      sales: users,
    });
  } catch (error) {
    res.status(400).send("unable to find users in the db");
  }
});

module.exports = router;
