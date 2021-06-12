var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model');
var matchedProductModel = require('../models/matchedProducts.model')
const user_itemModel = require('../models/user_item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const cate = req.query.cate || 1;
    console.log(cate);
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 30;
    const q = req.query.q || '';
    const totalItem = await itemModel.getSizeAll(q, cate)
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await itemModel.getAll(q, page, pageSize, cate);
    res.render('product', {
        items: items,
        key: q,
        totalPage: totalPage,
        current: page
    });
});

router.get('/:id', async function(req, res) {
    const item_id = req.params.id;
    const matchedItems = await matchedProductModel.getListItemByIdMatch(item_id);
    if(req.session.isAuth)
    {
        const user_id = req.session.authUser.id
        const user_item = await user_itemModel.getById(user_id, item_id)
        if(user_item == null)
        {
            const new_user_item = {user_id: user_id, item_id: item_id}
            await user_itemModel.add(new_user_item)
        }
        await user_itemModel.increment_view(user_id, item_id)
    }
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