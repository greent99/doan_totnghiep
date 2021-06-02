var exphbs = require('express-handlebars');

module.exports = function (app) {
    const hbs = exphbs.create({
        defaultLayout: 'layout',
        extname: 'hbs',
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
        helpers: require('../helpers/handlebar.helper').helpers,
      });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
}