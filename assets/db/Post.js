const sequelize = require('sequelize');

const connection = require('./connection');

const Post = connection.define('tbl_post', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
})

Post.sync({force: false});

module.exports = Post;