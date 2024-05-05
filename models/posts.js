const {DataTypes} = require('sequelize');

const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    creator: {
        type: DataTypes.JSON
    },
    createdAt: {
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Post;
