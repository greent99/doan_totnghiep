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

    async getSizeAll(name, cate, webFilter) {
        name = name ? name : '';
        cate = cate ? cate : 0;
        webFilter = webFilter ? webFilter : 0;
        const items = await db.raw(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0))`);
        //console.log(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0))`)
        return items.length;
    },

    async getAll(name, pageIndex, pageSize, cate, webFilter, priceFilter) {
        name = name ? name : '';
        cate = cate ? cate : 0;
        webFilter = webFilter ? webFilter : 0;
        priceFilter = priceFilter ? priceFilter : 0;
        let offset = (pageIndex - 1) * pageSize

        if(priceFilter == 1)
        {
            console.log(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0)) order by price OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY; `)
            return db.raw(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0)) order by price OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY; `); 
        }
        if(priceFilter == 2)
        {
            return db.raw(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0)) order by price desc OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY; `); 
        }
        if(!cate.code)
            return db.raw(`select * from item	where name like N'%${name}%' and ((nguondulieu = ${webFilter}) or (${webFilter} = 0)) order by name OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY; `); 
    
        return db.raw(`select * from item	where name like N'%${name}%' and ((Category = '${cate.code}') or ('${cate.code}' = '')) and ((nguondulieu = ${webFilter}) or (${webFilter} = 0)) order by name OFFSET ${offset} ROWS
        FETCH NEXT ${pageSize} ROWS ONLY; `); 
    },

}