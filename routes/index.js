var express = require('express');
const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model')
var router = express.Router();
const capitalize  = require('capitalize');
const db = require('../utils/db');
const matchedProductsModel = require('../models/matchedProducts.model');

/* GET home page. */
router.get('/',async function(req, res, next) {
  let list_recommend_category = []
  let list_recommend_shop = []
  let list_hot_item = []
  let haveRecommendCategory = false
  let haveRecommendShop = false
  let haveHotItem = false
  const categories = await categoryModel.getByLevel(1);
  for(cate of categories)
  {
    cate.name = titleCase(cate.name.toUpperCase());
  }
 
  if(req.session.isAuth)
  {
    const user_id = req.session.authUser.id
    list_recommend_category = await userModel.getRecommendListByCategory(user_id)
    list_recommend_shop = await userModel.getRecommendListByShop(user_id)
    
    for(item_shop of list_recommend_shop)
      item_shop.priceString = converPrice(item_shop.Price);
    for(item_cat of list_recommend_category)
    item_cat.priceString = converPrice(item_cat.Price);

    haveRecommendCategory = list_recommend_category != null ? true : false
    haveRecommendShop = list_recommend_shop != null ? true : false
  }
  else
  {
    const hot_item_arr = await db('user_item').orderBy('total_view', 'desc').limit(4)
    for(hot_item of hot_item_arr)
    {
      const hot_item_match = await matchedProductsModel.getByIdMatch(hot_item.item_id)
      list_hot_item.push(hot_item_match[0])
    }
    for(item_hot of list_hot_item)
      item_hot.priceString = converPrice(item_hot.Price);

    haveHotItem = list_hot_item.length > 0 ? true : false
  }
  console.log(list_hot_item)
  res.render('index', { 
    title: 'Express',
    list_recommend_category: list_recommend_category,
    list_recommend_shop: list_recommend_shop,
    list_hot_item: list_hot_item,
    categories: categories,
    haveRecommendCategory: haveRecommendCategory,
    haveRecommendShop: haveRecommendShop,
    haveHotItem: haveHotItem
  });
});

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
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
