var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var productsRouter = require('../routes/products');
var authRouter = require('../routes/auth');

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/auth', authRouter)
}