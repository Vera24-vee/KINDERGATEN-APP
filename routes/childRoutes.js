const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const Child = require("../models/Child");

// GET route to render the form
router.get("/addChild", (req, res) => {
  res.render("children", {
    success: req.query.success, // Pass success indicator
    error: req.query.error, // Pass error indicator
  });
});

// POST route to handle form submission
router.post("/addChild", async (req, res) => {
  try {
    console.log("Form data received:", req.body);
    // Create and save the child
    const child = new Child(req.body);
    await child.save();

    console.log("Child record added:", child); // Logs saved child to the terminal
    res.redirect("/childtable"); // Redirect with success indicator
  } catch (error) {
    console.error("Error saving child:", error); // Logs errors
    // res.redirect("/child/childtable?error=Failed to save the child. Please try again!");
    const errorMsg = encodeURIComponent(
      "Failed to save the child. Please try again!"
    );
    res.redirect(`/childtable?error=${errorMsg}`);
  }
});

router.get("/childtable", async (req, res) => {
  try {
    const items = await Child.find().sort({ $natural: -1 });
    res.render("childrenlist", {
      children: items,
    });
  } catch (error) {
    res.status(400).send("unable to find child in the db");
  }
});

// GET: render update form
router.get("/updateChild", async (req, res) => {
  try {
    const updateChild = await Child.findById(req.query.id);
    res.render("updatechild", { child: updateChild });
  } catch (error) {
    res.status(400).send("Unable to find child in the database.");
  }
});

// POST: save updated form
router.post("/updateChild", async (req, res) => {
  try {
    await Child.findByIdAndUpdate(req.query.id, req.body);
    res.redirect("/childtable");
  } catch (error) {
    res.status(400).send("Unable to update child in the database.");
  }
});

router.post(
  "/deleteChild",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      await Child.deleteOne({ _id: req.body.id });
      res.redirect("/childtable");
    } catch (error) {
      res.status(400).send("unable to delete child in the db");
    }
  }
);

module.exports = router;
