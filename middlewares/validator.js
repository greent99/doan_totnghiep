const {check} = require('express-validator');

module.exports.Validator = {
	register: [
		check('username', 'Username is required').notEmpty(),
		check('password', 'Password is required').notEmpty(),
		check('password', 'Password must be more than 6 characters').isLength({min: 6}),
		check('confirm', 'Password confirmation is required').notEmpty(),
	],
	login: [
		check('username', 'Username is required').notEmpty(),
		check('password', 'Password is required').notEmpty(),
	]
}