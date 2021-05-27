var express = require('express');
var router = express.Router();
var itemModel = require('../models/item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const items = await itemModel.all() 
  console.log(items)
  res.render('product', { items: items });
});

module.exports = router;