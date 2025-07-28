const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const Child = require("../models/Child");

// GET route to render the form
router.get("addChild", (req, res) => {
  res.render("children", {
    success: req.query.success, // Pass success indicator
    error: req.query.error, // Pass error indicator
  });
});

// POST route to handle form submission
router.post("addChild", async (req, res) => {
  const { firstName, lastName, age, class: childClass, parentName, phoneNumber, residence } = req.body;
  if (!firstName || !lastName || !age || !childClass || !parentName || !phoneNumber || !residence) {
    return res.redirect("/child/addChild?error=" + encodeURIComponent("All fields are required."));
  }
  if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 10) {
    return res.redirect("/child/addChild?error=" + encodeURIComponent("Age must be a number between 1 and 10."));
  }
  const phoneRegex = /^[0-9\-\+\s]{7,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.redirect("/child/addChild?error=" + encodeURIComponent("Invalid phone number format."));
  }
  try {
    const child = new Child(req.body);
    await child.save();
    res.redirect("/child/addChild?success=" + encodeURIComponent("Child registered successfully!"));
  } catch (error) {
    const errorMsg = encodeURIComponent("Failed to save the child. Please try again!");
    res.redirect(`/child/addChild?error=${errorMsg}`);
  }
});

router.get("childtable", async (req, res) => {
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
router.get("updateChild", async (req, res) => {
  try {
    const updateChild = await Child.findById(req.query.id);
    res.render("updatechild", { child: updateChild });
  } catch (error) {
    res.status(400).send("Unable to find child in the database.");
  }
});

// POST: save updated form
router.post("updateChild", async (req, res) => {
  try {
    await Child.findByIdAndUpdate(req.query.id, req.body);
    res.redirect("/child/childtable");
  } catch (error) {
    res.status(400).send("Unable to update child in the database.");
  }
});
 
router.post(
  "deleteChild",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      await Child.deleteOne({ _id: req.body.id });
      res.redirect("/child/childtable");
    } catch (error) {
      res.status(400).send("unable to delete child in the db");
    }
  }
);

module.exports = router;
