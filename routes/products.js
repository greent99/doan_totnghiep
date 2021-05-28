var express = require('express');
var router = express.Router();
var itemModel = require('../models/item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 40
  const allItem = await itemModel.all()
  const totalPage = Math.ceil( allItem.length / pageSize)
  const items = await itemModel.pagination(page, pageSize)
  res.render('product', { 
    items: items,
    totalPage: totalPage,
    current: page,
    isFirstPage: page == 1 ? true : false,
  });
});

module.exports = router;