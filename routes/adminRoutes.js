const express = require("express");
const router = express.Router();

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.role === 'director') {
    return next();
  }
  res.redirect('/auth/login?error=' + encodeURIComponent('You must be an admin to access the dashboard.'));
}

router.get("dash", ensureAdmin, (req, res) => {
  res.render("adminDashboard");
});

module.exports = router;
