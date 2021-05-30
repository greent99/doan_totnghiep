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
        const items = await db.raw(`select * from(select * , ROW_NUMBER() OVER(PARTITION BY id_match order by id) num from item)
         inn where inn.num = 1 and name like '%${name}%'`);
        return items.length;
    },

    async searchByName(name, pageIndex, pageSize) {
        let offset = (pageIndex - 1) * pageSize;
        return db.raw(`
                    select * from(select * , ROW_NUMBER() OVER(PARTITION BY id_match order by id) num from item) inn where inn.num = 1 and name like '%${name}%'
                    order by id offset ${offset}
                    rows fetch next ${pageSize}
                    rows only `);
    },

}