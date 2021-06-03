const db = require('../utils/db')
const table_name = 'MyUser'
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    async getByUsername(username) {
        const users = await db(table_name).where('username', username)
        if (users.length === 0)
            return null;
        return users[0]
    },

    setPassword(password, user)
    {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash
    },

    validPassword(inputPassword, user) {
		const hash = user.password
        const result = bcrypt.compareSync(inputPassword, hash); // true
        return result
	}
}