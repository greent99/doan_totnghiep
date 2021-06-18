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

    async getSizeAll(q, cate, webFilter) {
        q = q ? q : "";
        cate = cate ? cate : 0;
        webFilter = webFilter ? webFilter : 0;
        const items = await db(table_name).where('name', 'like', `%${q}%`).where(function () {
            this.where('idPhanloai', cate).orWhere(cate == 0);
        }).where(function(){
            this.where('nguondulieu', webFilter).orWhere(webFilter == 0);
        });
        return items.length;
    },

    async getAll(name, pageIndex, pageSize, cate, webFilter, priceFilter) {
        name = name ? name : "";
        cate = cate ? cate : 0;
        webFilter = webFilter ? webFilter : 0;
        priceFilter = priceFilter ? priceFilter : 0;
        let offset = (pageIndex - 1) * pageSize

        if(priceFilter == 1)
        {
            return db(table_name).where('name', 'like', `%${name}%`).where(function () {
                this.where('idPhanloai', cate).orWhere(cate == 0);
            }).where(function(){
                this.where('nguondulieu', webFilter).orWhere(webFilter == 0);
            })
            .orderBy('price').limit(pageSize).offset(offset) 
        }
        if(priceFilter == 2)
        {
            return db(table_name).where('name', 'like', `%${name}%`).where(function () {
                this.where('idPhanloai', cate).orWhere(cate == 0);
            }).where(function(){
                this.where('nguondulieu', webFilter).orWhere(webFilter == 0);
            })
            .orderBy('price', 'desc').limit(pageSize).offset(offset) 
        }

        return db(table_name).where('name', 'like', `%${name}%`).where(function () {
            this.where('idPhanloai', cate).orWhere(cate == 0);
        }).where(function(){
            this.where('nguondulieu', webFilter).orWhere(webFilter == 0);
        })
        .orderBy('name').limit(pageSize).offset(offset)
    },

}