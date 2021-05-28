var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const items = await itemModel.all()
    res.render('product', { items: items });
});

router.get('/:id', async function(req, res) {
    res.render('product');
})

module.exports = router;