var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth', { layout: false });
});

router.post('/login', function(req, res, next) {
  
})

module.exports = router;