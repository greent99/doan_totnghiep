var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model');
var matchedProductModel = require('../models/matchedProducts.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 40;
    const q = req.query.q || '';
    const totalItem = await itemModel.getSizeAll(q)
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await itemModel.getAll(q, page, pageSize);
    res.render('product', {
        items: items,
        key: q,
        totalPage: totalPage,
        current: page
    });
});

router.get('/search', async function(req, res) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 40;
    const keySearch = req.query.keySearch;
    const lengthItems = await itemModel.getTotalBySearch(keySearch);
    const totalPage = Math.ceil(lengthItems / pageSize);
    listItem = await itemModel.searchByName(keySearch, page, pageSize);
    res.render('product', {
        keySearch: keySearch,
        items: listItem,
        totalPage: totalPage,
        current: page,
        isFirstPage: page == 1 ? true : false,
    });
});

router.get('/:id', async function(req, res) {
    const id = req.params.id;
    const matchedItems = await matchedProductModel.getListItemByIdMatch(id);
    console.log(matchedItems)
    res.render('matchedProducts', {
        matchedItems: matchedItems,
        helpers: {
            json: function(context) {
                return JSON.stringify(context);
            },
        },
    });
});

module.exports = router;