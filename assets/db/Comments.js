const sequelize = require('sequelize');

const connection = require('./connection');

const Comments = connection.define('tbl_comments', {
  authorname: {
    type: sequelize.STRING,
    allowNull: true,
    defaultValue: 'Anonymous',
  },
  comment: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  postID: {
    type: sequelize.INTEGER,
    allowNull: false,
  }
})

Comments.sync({ force: false });

module.exports = Comments;