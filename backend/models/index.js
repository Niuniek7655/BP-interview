import { Sequelize, DataTypes } from 'sequelize';
import { createRequire } from 'module';

// Import models
import MessageModel from './message.js';

// Import config from single source (config.cjs)
const require = createRequire(import.meta.url);
const dbConfig = require('../config/config.cjs');

const env = process.env.NODE_ENV || 'development';

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
