
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('web_shop', 'postgres', 'qwert1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

module.exports = sequelize;
