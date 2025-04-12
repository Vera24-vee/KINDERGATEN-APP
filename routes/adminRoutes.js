const express = require("express");
const router = express.Router();

router.get("/dash", (req, res) => {
  res.render("adminDashboard");
});


module.exports = router;
