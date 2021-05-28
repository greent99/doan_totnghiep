var express = require('express');
var router = express.Router();
var cpModel = require('../models/compareProduct.model');

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    const items = await cpModel.getListItemByIdMatch(id);
    res.render('compareproduct', { items: items });
});

module.exports = router;