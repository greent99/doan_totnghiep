var express = require('express');
const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model')
var router = express.Router();
const capitalize  = require('capitalize');

/* GET home page. */
router.get('/',async function(req, res, next) {
  let list_recommend_category = []
  let list_recommend_shop = []
  let haveRecommendCategory = false
  let haveRecommendShop = false
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
    haveRecommendCategory = list_recommend_category != null ? true : false
    haveRecommendShop = list_recommend_shop != null ? true : false
  }
  res.render('index', { 
    title: 'Express',
    list_recommend_category: list_recommend_category,
    list_recommend_shop: list_recommend_shop,
    categories: categories,
    haveRecommendCategory: haveRecommendCategory,
    haveRecommendShop: haveRecommendShop
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

module.exports = router;
