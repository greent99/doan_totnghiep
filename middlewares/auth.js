module.exports =
	{
		isAuth(req, res, next) {
			if (req.session.isAuth === false) {
				req.session.retUrl = req.originalUrl;
				return res.redirect('/auth');
			}
			next();
		},
		isNotAuth(req, res, next) {
			if (req.session.isAuth === true) {
				return res.redirect(req.headers.referer || '/');
			}
			next();
		}
	}