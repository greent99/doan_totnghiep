var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 40
    const allItem = await itemModel.all()
    const keySearch = req.query.keySearch || "";
    const totalPage = Math.ceil(allItem.length / pageSize)
    const items = await itemModel.pagination(page, pageSize)
    res.render('product', {
        items: items,
        keySearch: keySearch,
        totalPage: totalPage,
        current: page,
        isFirstPage: page == 1 ? true : false,
    });

});

router.get('/search', async function(req, res) {
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 12
    const keySearch = req.query.keySearch;
    const lengthItems = await itemModel.getTotalBySearch(keySearch);
    const totalPage = Math.ceil(lengthItems / pageSize)
    listItem = await itemModel.searchByName(keySearch, page, pageSize);
    res.render('product', {
        keySearch: keySearch,
        items: listItem,
        totalPage: totalPage,
        current: page,
        isFirstPage: page == 1 ? true : false,
    });
})

module.exports = router;