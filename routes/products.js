var express = require('express');
const { route } = require('.');
const categoryModel = require('../models/category.model');
var router = express.Router();
var itemModel = require('../models/item.model');
var matchedProductModel = require('../models/matchedProducts.model')
const user_itemModel = require('../models/user_item.model')
const timestampToDate = require('timestamp-to-date');
const { json } = require('express');
const matchedProductsModel = require('../models/matchedProducts.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const webFilter = req.query.webFilter || 0;
    const priceFilter = req.query.priceFilter || 0;
    const parent_cate = req.query.parent || null
    const subCategory = await categoryModel.getSubCategory(parent_cate)
    const parentCategory = await categoryModel.getById(parent_cate)
    let cate = req.query.cate || 0
    if(subCategory)
        cate = req.query.cate || subCategory[0].id;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 30;
    const q = req.query.q || '';
    
    
    
    const category = await categoryModel.getById(cate)

    const nameCate = parentCategory ? parentCategory.name : ""
    const totalItem = await itemModel.getSizeAll(q, category, webFilter);

    const titleSearch = (cate === 0 & q != '') ? `Kết quả tìm kiếm cho "${q}" - ${totalItem} kết quả` : (q== '') ? nameCate : `${nameCate} ** Kết quả tìm kiếm cho "${q}" - ${totalItem} kết quả`;
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await itemModel.getAll(q, page, pageSize, category, webFilter, priceFilter);

    if(items !== null)
    {
        for(item of items)
        {
            item.priceString = converPrice(item.Price);
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
        current: page,
        subCategory: subCategory,
        parent_category: parent_cate
    });
});

router.get('/:id', async function(req, res) {
    const webFilter = req.query.webFilter || 0;
    const order = req.query.order || 0;
    const rating = req.query.rating || 0
    const id_match = req.params.id;
    const listMatchItem = await matchedProductsModel.getByIdMatch(id_match)
    console.log(listMatchItem)
    const firstItemInIdMatch = await listMatchItem[0]
    //const item_id = req.params.id
    const item_id = firstItemInIdMatch.id
    const matchedItems = await matchedProductModel.getListItemByIdMatch(item_id, order, webFilter, rating);
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
        const formatYmd = date => date.toISOString().slice(0, 10);
        for(matchedItem of matchedItems)
        {
            matchedItem.avg_rating = roundToOne(matchedItem.Avg_rating);
            matchedItem.star = matchedItem.avg_rating / 5 * 100;
            matchedItem.priceString = converPrice(matchedItem.Price);
            matchedItem.totalRating = matchedItem.Star1 + matchedItem.Star2 + matchedItem.Star3 + matchedItem.Star4 + matchedItem.Star5
            if(matchedItem.promotion.length > 0)
            {
                
                for(promotion of matchedItem.promotion)
                {
                    promotion.minPrice = promotion.min_order_amount - matchedItem.Price;
                    let isPercent = false;
                    let isValid = matchedItem.price <= promotion.min_order_amount ? true : false;


                    let newPrice = matchedItem.Price
                    let countOfItemApply = Math.ceil(promotion.min_order_amount / matchedItem.Price)
                    if(promotion.type == "cart_fixed")
                    {
                        isPercent = false;
                        newPrice = newPrice - promotion.discount_amount
                    }
                    if(promotion.type == "by_percent")
                    {
                        isPercent = true;
                        let discount = promotion.discount_amount * newPrice / 100
                        if(discount > promotion.max_order_amount)
                            discount = promotion.max_order_amount
                        newPrice = newPrice - discount
                        promotion.maxOrderAmount = converPrice(promotion.max_order_amount);
                    }
                    const str_newPrice = converPrice(newPrice)
                    promotion.newPrice = str_newPrice
                    promotion.countOfItemApply = countOfItemApply
                    promotion.isValid = isValid;
                    promotion.minOrderAmount = converPrice(promotion.min_order_amount);
                    promotion.isPercent = isPercent;
                    if(matchedItem.NguonDuLieu == 1)
                    {
                        promotion.start_date = new Date(+promotion.start_date * 1000)
                        promotion.expiry_date = new Date(+promotion.expiry_date * 1000);
                        promotion.title = getTitleSendo(promotion);
                    }
                    else
                    {
                        promotion.start_date = new Date(promotion.start_date)
                        promotion.expiry_date = new Date(promotion.expiry_date);
                    }
         
                    promotion.start_date = promotion.start_date.toLocaleDateString();
                    promotion.expiry_date = promotion.expiry_date.toLocaleDateString();
                }
            }
        }
    }

    res.render('matchedProducts', {
        matchedItems: matchedItems,
        idMatch: item_id,
        order: order,
        webFilter: webFilter,
        rating: rating,
        helpers: {
            json: function(context) {
                return JSON.stringify(context);
            },
        },
    });
});


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

function getTitleSendo(promotion)
{
    if(promotion.type == "cart_fixed")
    {
        discount = +promotion.discount_amount/1000;
        return `Giảm ${discount}K`;
    }
    else
    {
        return `Giảm ${promotion.discount_amount}%`;
    }

}

router.post('/', async function(req, res){
    const idShop = req.body.idShop;
    const minPrice = req.body.minPrice;
    const listProduct = await matchedProductModel.getListProductInShop(idShop, minPrice);
    res.json(listProduct);
    
})

module.exports = router;