const Sequelize = require ('sequelize');
require('dotenv').config({path: 'variables.env' })
const db = new Sequelize (process.env.DATABASE_URL);

module.exports = db;

