const knex = require('knex')({
    client: 'mssql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: + process.env.DB_PORT,
      encrypt: process.env.DB_ENCRYPT === 'true' || true
    },
    pool: { min: 0, max: 50 }
  });
  
  module.exports = knex;