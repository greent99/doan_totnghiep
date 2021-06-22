const db = require('../utils/db')
const table_name = 'item'
const promotion_table_name = "LuuPromotion"

module.exports = {
    async getListItemByIdMatch(id) {
        const listItem = await db(table_name).where('id_match', id).orderBy('price').orderBy('WR', 'desc');
        
        for(item of listItem)
        {
            let currentDate = new Date()
            const listPromotion = await db(promotion_table_name).where('shop_id', item.idShop).where('expiry_date', '>=', currentDate)
            item.promotion = listPromotion
        }

        if (listItem.length === 0)
            return null;
        return listItem;
    },

}