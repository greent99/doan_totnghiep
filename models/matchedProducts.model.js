const db = require('../utils/db')
const table_name = 'item'
const promotion_table_name = "LuuPromotion"

module.exports = {
    async getListItemByIdMatch(id, order, webFilter, rating) {
        order = order ? order : 0;
        order_str = (order == 2 || order == 0) ? 'asc' : 'desc'
        rating = rating ? rating : 0;
        rating_str = rating == 1 ? 'asc' : 'desc'
        webFilter = webFilter ? webFilter : 0;
        let listItem;
        if(rating != 0 && order == 0)
        {
            listItem = await db(table_name).where('id_match', id).where(function () {
                this.where('NguonDuLieu', webFilter).orWhere(webFilter == 0);
            }).orderBy('WR', rating_str); 
        }
        else
        {
            listItem = await db(table_name).where('id_match', id).where(function () {
                this.where('NguonDuLieu', webFilter).orWhere(webFilter == 0);
            }).orderBy('Price', order_str).orderBy('WR', rating_str);
        }

        for(item of listItem)
        {
            let currentDate = new Date()
            const listPromotion = await db(promotion_table_name).where('SpID', item.SpID)
            // .where('expiry_date', '>=', currentDate)
            item.promotion = listPromotion
        }

        if(order == 1)
        {
            listItem.sort(function(a,b){
                a.promotion.length - b.promotion.length;
            });
        }

        if (listItem.length === 0)
            return null;
        return listItem;
    },

    async getListProductInShop(idShop, minPrice){
        const listProduct = await db.raw(`select * from Item where SpID = ${idShop} and Price >= ${minPrice} order by Price`)
        return listProduct;
    },

    async getByIdMatch (id_match)
    {
        return db(table_name).where('id_match', id_match)
    }
}