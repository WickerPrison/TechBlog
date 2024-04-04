const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    process.env.DB_USER,
    {
      host: 'dpg-co7bpmed3nmc73e7tu40-a',
      dialect: 'postgres',
      port:5432
    }
  );
}

module.exports = sequelize;