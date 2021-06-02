var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var productsRouter = require('../routes/products');

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
}