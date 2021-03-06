const session = require('express-session');

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

module.exports = function (app) {
  app.set('trust proxy', 1);
  app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true
    }
  }));
}