const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resource = sequelize.define('Resource', {
  title:       { type: DataTypes.STRING, allowNull: false },
  type:        { type: DataTypes.STRING, defaultValue: 'Downloads' },
  description: { type: DataTypes.TEXT },
  fileUrl:     { type: DataTypes.STRING },
  externalUrl: { type: DataTypes.STRING },
  status:      { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'published' },
  year:        { type: DataTypes.STRING },
  downloads:   { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'resources',
  timestamps: true,
});

module.exports = Resource;
