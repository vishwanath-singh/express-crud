const Sequelize = require('sequelize')

const sequelize = new Sequelize('blogs', 'root', 'password', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;