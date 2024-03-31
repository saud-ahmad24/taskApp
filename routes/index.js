var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../helper");
const { logout } = require('../controllers/authController');


router.get('/', authenticateToken, function (req, res, next) {
  res.redirect('/tasks')
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/logout', logout);

module.exports = router;
