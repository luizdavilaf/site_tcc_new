const { Sequelize, DataTypes } = require('sequelize');
const dbConfig  = require("./dbconnection")



const sequelize = new Sequelize(dbConfig.development);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        //sequelize.sync({ force: true });
        sequelize.sync()
        console.log("sync ok")
    }).catch(error => {
        console.log('Unable to connect to the database:', error);
    });

module.exports = sequelize;