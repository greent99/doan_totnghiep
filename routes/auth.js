var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller')
const {validationResult} = require("express-validator");
const userModel = require('../models/user.model')
const {isNotAuth, isAuth} = require("../middlewares/auth");
const {Validator} = require('../middlewares/validator')

/* GET home page. */
router.get('/', isNotAuth, function(req, res, next) {
  if (req.headers.referer) {
    req.session.retUrl = req.headers.referer;
  }

  res.render('auth', { 
    layout: false 
  });
});

router.post('/register', isNotAuth, Validator.register, authController.register)

router.post('/login', isNotAuth, Validator.login, authController.login)

module.exports = router;