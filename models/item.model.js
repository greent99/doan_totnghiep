const { ImATeapot } = require('http-errors')
const { all } = require('../routes/products')
const db = require('../utils/db')
const table_name = 'item'

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
        return db(table_name).insert(user);
    },

    async getSizeAll(q) {
        q = q ? q : ""
        const items = await db(table_name).where('name', 'like', `%${q}%`)
        return items.length;
    },

    async getAll(name, pageIndex, pageSize) {
        name = name ? name : ""
        let offset = (pageIndex - 1) * pageSize
        return db(table_name).where('name', 'like', `%${name}%`).orderBy('id').limit(pageSize).offset(offset)
    },

}