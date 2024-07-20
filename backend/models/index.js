const { Sequelize } = require('sequelize');
const config = require('../config/config.js');
const userModel = require('./user');
const productModel = require('./product');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const db = {
  sequelize,
  Sequelize,
  User: userModel(sequelize),
  Product: productModel(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;