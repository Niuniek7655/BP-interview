import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import models
import MessageModel from './message.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';

// Database configuration
const dbConfig = {
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

const config = dbConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging
});

// Initialize models
const Message = MessageModel(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  Message
};

export default db;
export { sequelize, Message };
