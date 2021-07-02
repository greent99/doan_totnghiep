const db = require('../utils/db')
const table_name = 'item'
const promotion_table_name = "LuuPromotion"

module.exports = {
    async getListItemByIdMatch(id, order, webFilter, rating) {
        order = order ? order : 0;
        order_str = 'asc'
        if(order == 0)
            order_str = 'asc'
        else
            order_str = order == 2 ? 'asc' : 'desc'
        rating = rating ? rating : 0;
        rating_str = rating == 1 ? 'asc' : 'desc'
        webFilter = webFilter ? webFilter : 0;
        let listItem = await db(table_name).where('id_match', id).where(function () {
            this.where('NguonDuLieu', webFilter).orWhere(webFilter == 0);
        }).orderBy('Price', order_str).orderBy('WR', rating_str);
        
        for(item of listItem)
        {
            let currentDate = new Date()
            const listPromotion = await db(promotion_table_name).where('SpID', item.SpID)
            // .where('expiry_date', '>=', currentDate)
            item.promotion = listPromotion
        }

        if (listItem.length === 0)
            return null;
        return listItem;
    },

}