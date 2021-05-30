var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model');
var matchedProductModel = require('../models/matchedProducts.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 40;
    const allItem = await itemModel.all();
    const keySearch = req.query.keySearch || '';
    const totalPage = Math.ceil(allItem.length / pageSize);
    const items = await itemModel.pagination(page, pageSize);
    res.render('product', {
        items: items,
        keySearch: keySearch,
        totalPage: totalPage,
        current: page,
        isFirstPage: page == 1 ? true : false,
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