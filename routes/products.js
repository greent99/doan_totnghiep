var express = require('express');
const { route } = require('.');
var router = express.Router();
var itemModel = require('../models/item.model');
var matchedProductModel = require('../models/matchedProducts.model')
const user_itemModel = require('../models/user_item.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const webFilter = req.query.webFilter || 0;
    const priceFilter = req.query.priceFilter || 0;
    const cate = req.query.cate || 0;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 30;
    const q = req.query.q || '';
    const totalItem = await itemModel.getSizeAll(q, cate, webFilter);
    const nameCate = getNameCategory(cate) || `Kết quả tìm kiếm cho "${q}" - ${totalItem} kết quả`;
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await itemModel.getAll(q, page, pageSize, cate, webFilter, priceFilter);
    res.render('product', {
        nameCate: nameCate,
        cate: cate,
        webFilter: webFilter,
        priceFilter: priceFilter,
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

function getNameCategory(idCate)
{
    if(idCate == 1)
    {
        return "Điện thoại, laptop";
    }

    if(idCate == 2)
    {
        return "Phụ kiên, thiết bị số";
    }

    if(idCate == 3)
    {
        return "Đồ chơi, mẹ và bé";
    }

    if(idCate == 4)
    {
        return "Hàng tiêu dùng";
    }

    return;
}

module.exports = router;