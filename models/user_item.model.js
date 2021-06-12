const db = require('../utils/db')
const table_name = 'User_Item'

module.exports = {
    async all() {
        return db(table_name)
    },

    async getById(user_id, item_id) {
        const user_items = await db(table_name).where('user_id', user_id).where('item_id', item_id)
        if (user_items.length === 0)
            return null;
        return user_items[0]
    },

    async getByUserId(user_id) {
        const user_items = await db(table_name).where('user_id', user_id).orderBy('total_view', 'desc')
        if (user_items.length === 0)
            return null;
        return user_items[0]
    },

    async add(user_item) {
        return db(table_name).insert(user_item);
    },

    async increment_view(user_id, item_id, count = 1){
        const result = await db(table_name).increment('total_view').where('user_id', user_id).where('item_id', item_id)
        return result
    }

}