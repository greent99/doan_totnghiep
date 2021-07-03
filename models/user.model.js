const db = require('../utils/db')
const table_name = 'MyUser'
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

    async getRecommendList(user_id)
    {
        const user_items = await user_itemModel.getByUserId(user_id)
        if(user_items == null)
            return null
        
        const num_recommend_item = 4
        const top_view_item = user_items[0]
        //console.log(top_view_item)
        const recommend_list = await db('item').where('id_match', top_view_item.item_id).limit(num_recommend_item);

        return recommend_list
    }
}