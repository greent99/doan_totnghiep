const db = require('../utils/db')
const table_name = 'item'

module.exports = {
    async getListItemByIdMatch(id) {
        const listItem = await db(table_name).where('id_match', id);
        if (listItem.length === 0)
            return null;
        return listItem;
    }
}