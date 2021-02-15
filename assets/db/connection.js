const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connection = new Sequelize('db_nodejsblog', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;