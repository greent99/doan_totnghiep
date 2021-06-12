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

    async getSizeAll(q, cate) {
        q = q ? q : "";
        cate = cate ? cate : 0
        const items = await db(table_name).where('name', 'like', `%${q}%`).where(function () {
            this.where('idPhanloai', cate).orWhere(cate == 0);
        });
        // const items = await db(table_name).where('name', 'like', `%${q}%`).where('idPhanloai', cate );
        return items.length;
    },

    async getAll(name, pageIndex, pageSize, cate) {
        name = name ? name : "";
        cate = cate ? cate : 0;
        let offset = (pageIndex - 1) * pageSize
        return db(table_name).where('name', 'like', `%${name}%`).where(function () {
            this.where('idPhanloai', cate).orWhere(cate == 0);
        }).orderBy('name').limit(pageSize).offset(offset)
    },

}