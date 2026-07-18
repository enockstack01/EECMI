const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NewsPost = sequelize.define('NewsPost', {
  title:       { type: DataTypes.STRING, allowNull: false },
  category:    { type: DataTypes.STRING, defaultValue: 'General' },
  excerpt:     { type: DataTypes.TEXT },
  content:     { type: DataTypes.TEXT },
  author:      { type: DataTypes.STRING, defaultValue: 'EECMI Team' },
  status:      { type: DataTypes.ENUM('draft', 'published', 'archived'), defaultValue: 'draft' },
  featured:    { type: DataTypes.BOOLEAN, defaultValue: false },
  imageUrl:    { type: DataTypes.STRING },
  readTime:    { type: DataTypes.STRING, defaultValue: '3 min read' },
  publishedAt: { type: DataTypes.DATE },
  views:       { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'news_posts',
  timestamps: true,
});

module.exports = NewsPost;
