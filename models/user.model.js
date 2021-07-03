const db = require('../utils/db')
const table_name = 'MyUser'
const recommend_shop_tbm = 'RecommendShop'
const recommend_category_tbm = 'RecommendCategory'
const bcrypt = require('bcrypt');
const user_itemModel = require('./user_item.model');
const itemModel = require('./item.model');
const matchedProductsModel = require('./matchedProducts.model');
const saltRounds = 10;

module.exports = {
    async all() {
        return db(table_name)
    },

    async getById(id) {
        const users = await db(table_name).where('id', id)
        if (users.length === 0)
            return null;
        return users[0]
    },

    async add(user) {
        return db(table_name).insert(user).returning('id');
    },

    async getByUsername(username) {
        const users = await db(table_name).where('username', username)
        if (users.length === 0)
            return null;
        return users[0]
    },

    setPassword(password, user)
    {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash
    },

    validPassword(inputPassword, user) {
		const hash = user.password
        const result = bcrypt.compareSync(inputPassword, hash); // true
        return result
	},

    async getRecommendListByCategory(user_id)
    {
        const user_items = await user_itemModel.getByUserId(user_id)
        if(user_items == null)
            return null
        
        const result = []
        const top_view_item = user_items[0]
        const item = await itemModel.getById(top_view_item.item_id)

        const recommend_list = await db(recommend_category_tbm).where('id', item.id);
        if(recommend_list.length > 0)
        {
            const top_recommend_shop = recommend_list[0]
            const Top20ProductShopStr = top_recommend_shop.recommend_string
            const Top20ProductShopArr = Top20ProductShopStr.split(',')
           
            var Top5ProductShop = Top20ProductShopArr.slice(0, 4)
            
            const result = await db('item').whereIn('id', Top5ProductShop)
            return result;
        }

        return result
        //return null
    },

    async getRecommendListByShop(user_id)
    {
        const user_items = await user_itemModel.getByUserId(user_id)
        if(user_items == null)
            return null
        
        const top_view_item = user_items[0]
        const item = await itemModel.getById(top_view_item.item_id)

        const recommend_list = await db('item').where('Seller_ID', item.Seller_ID).limit(4).offset(0)
        return recommend_list
    }
}