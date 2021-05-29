const { ImATeapot } = require('http-errors')
const { all } = require('../routes/products')
const db = require('../utils/db')
const table_name = 'item'

module.exports = {
    async all() {
        return db(table_name)
    },

    async pagination(pageIndex, pageSize) {
        let offset = (pageIndex - 1) * pageSize
        return db(table_name).orderBy('id').limit(pageSize).offset(offset)
    },

    async getById(id) {
        const users = await db(table_name).where('id', id)
        if (users.length === 0)
            return null;
        return users[0]
    },

    async add(user) {
        return db(table_name).insert(user);
    },

    async getTotalBySearch(name) {
        const items = await db(table_name).where('name', 'like', `%${name}%`);
        return items.length;
    },

    async searchByName(name, pageIndex, pageSize) {
        let offset = (pageIndex - 1) * pageSize;
        return db(table_name).where('name', 'like', `%${name}%`).orderBy('price', 'asc').orderBy('WR', 'desc').limit(pageSize).offset(offset);
    }
}