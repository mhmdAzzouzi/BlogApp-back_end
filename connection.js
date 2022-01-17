const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://admin:secret@localhost:5432/test1_db')

module.exports = sequelize

global.sequelize = sequelize
