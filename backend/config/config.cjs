require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'interview123',
    database: process.env.DB_NAME || 'interview',
    host: process.env.DB_HOST || 'mysql',
    port: 3306,
    dialect: 'mysql',
    logging: console.log
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'interview123',
    database: process.env.DB_NAME || 'interview',
    host: process.env.DB_HOST || 'mysql',
    port: 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'interview123',
    database: process.env.DB_NAME || 'interview',
    host: process.env.DB_HOST || 'mysql',
    port: 3306,
    dialect: 'mysql',
    logging: false
  }
};

