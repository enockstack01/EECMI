const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Newsletter = sequelize.define('Newsletter', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  name: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'newsletters',
  timestamps: true,
});

module.exports = Newsletter;
