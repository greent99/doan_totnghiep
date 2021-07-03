var express = require('express');
const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model')
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  let list_recommend_category = []
  let list_recommend_shop = []
  const categorys = await categoryModel.getByLevel(1)
 
  if(req.session.isAuth)
  {
    const user_id = req.session.authUser.id
    list_recommend_category = await userModel.getRecommendListByCategory(user_id)
    list_recommend_shop = await userModel.getRecommendListByShop(user_id)
  }
  res.render('index', { 
    title: 'Express',
    list_recommend_category: list_recommend_category,
    list_recommend_shop: list_recommend_shop,
    categorys: categorys
  });
});

module.exports = router;
