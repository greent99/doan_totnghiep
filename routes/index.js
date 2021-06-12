var express = require('express');
const userModel = require('../models/user.model');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  let list_recommend = []
  if(req.session.isAuth)
  {
    const user_id = req.session.authUser.id
    list_recommend = await userModel.getRecommendList(user_id)
  }
  res.render('index', { 
    title: 'Express',
    list_recommned: list_recommend
  });
});

module.exports = router;
