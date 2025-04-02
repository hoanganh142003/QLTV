const { Sequelize } = require('sequelize');
require('dotenv').config();

const connect = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: 3306,
});

const connectDB = async () => {
    try {
        await connect.authenticate();
        console.log('Connect Database Success!');
    } catch (error) {
        console.error('error connect database:', error);
    }
};

module.exports = { connectDB, connect };
