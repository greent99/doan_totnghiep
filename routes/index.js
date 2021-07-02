var express = require('express');
const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model')
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  let list_recommend = []
  const categorys = await categoryModel.getByLevel(1)
 
  if(req.session.isAuth)
  {
    const user_id = req.session.authUser.id
    list_recommend = await userModel.getRecommendList(user_id)
  }
  res.render('index', { 
    title: 'Express',
    list_recommned: list_recommend,
    categorys: categorys
  });
});

module.exports = router;
