const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'cars',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'cars',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'cars',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  }
};