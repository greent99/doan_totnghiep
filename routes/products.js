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
    const nameCate = getNameCategory(cate);
    const titleSearch = (cate === 0 & q != '') ? `Kết quả tìm kiếm cho "${q}" - ${totalItem} kết quả` : (q== '') ? nameCate : `${nameCate} ** Kết quả tìm kiếm cho "${q}" - ${totalItem} kết quả`;
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await itemModel.getAll(q, page, pageSize, cate, webFilter, priceFilter);

    if(items !== null)
    {
        for(item of items)
        {
            item.priceString = converPrice(item.price);
        }
    }

    
    res.render('product', {
        titleSearch: titleSearch,
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
    const webFilter = req.query.webFilter || 0;
    const order = req.query.order || 0;
    const item_id = req.params.id;
    const matchedItems = await matchedProductModel.getListItemByIdMatch(item_id, order, webFilter);
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
    if(matchedItems !== null)
    {
        for(matchedItem of matchedItems)
        {
            matchedItem.avg_rating = roundToOne(matchedItem.avg_rating);
            matchedItem.star = matchedItem.avg_rating / 5 * 100;
            matchedItem.priceString = converPrice(matchedItem.price);

            if(matchedItem.promotion.length > 0)
            {
                for(promotion of matchedItem.promotion)
                {
                    let newPrice = matchedItem.price
                    let countOfItemApply = Math.ceil(promotion.min_order_amount / matchedItem.price)
                    if(promotion.type == "cart_fixed")
                    {
                        newPrice = newPrice - promotion.discount_amount
                    }
                    if(promotion.type == "by_percent")
                    {
                        let discount = promotion.discount_amount * newPrice / 100
                        if(discount > promotion.max_order_amount)
                            discount = promotion.max_order_amount
                        newPrice = newPrice - discount
                    }
                    // cong thuc tinh phan nguyen trong js
                    const d = (newPrice - newPrice%1000)/1000
                    const r = newPrice - d * 1000
                    str_newPrice = `${d}.${r}`
                    promotion.newPrice = str_newPrice
                    promotion.countOfItemApply = countOfItemApply
                }
            }
        }
    }

    res.render('matchedProducts', {
        matchedItems: matchedItems,
        idMatch: item_id,
        order: order,
        webFilter: webFilter,
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

function roundToOne(num)
{
    return +(Math.round(num + "e+1") + "e-1");
}

function converPrice(price)
{
    let tmp = price.toString();

    for(let i = tmp.length - 3; i > 0; i = i - 3)
    {
        tmp = tmp.slice(0, i) + "." + tmp.slice(i, tmp.length);
    }

    return tmp;
}

module.exports = router;