const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Prayer = sequelize.define('Prayer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
  request: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  prayerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'prayed', 'answered'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'prayers',
  timestamps: true,
});

module.exports = Prayer;
