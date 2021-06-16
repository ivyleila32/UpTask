const Sequelize = require ('sequelize');
require('dotenv')
const db = new Sequelize ('','','', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
    operatorsAlianses: false,
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

