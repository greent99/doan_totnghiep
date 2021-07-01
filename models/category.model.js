const db = require('../utils/db')
const table_name = 'category'
const item_table_name = 'item'

module.exports = {
    async all() {
        return db(table_name)
    },

    async getSubCategory(id){
        if(id)
            return db(table_name).where('parent_id', id)
        return null
    },

    async products (id) {
        return db(table_name).join(item_table_name, `${table_name}.code`, '=', `${item_table_name}.Category`)
                .where(`${table_name}.id`, id)
    },

    async getById(id) {
        if(id)
        {
            const categorys = await db(table_name).where('id', id)
            if (categorys.length === 0)
                return null;
            return categorys[0]
        }
        return null
    },

    async getByLevel(level){
        return db(table_name).where('level', level)
    },


    async add(user_item) {
        return db(table_name).insert(user_item);
    }
}