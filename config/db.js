const Sequelize = require ('sequelize');
require('dotenv').config({path: 'variables.env' })
const db = new Sequelize (process.env.DATABASE_URL, {
    ssl: true,
    define: {
        timestamps: false
    },
    pool : {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;

