const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  skills: {
    type: DataTypes.TEXT,
  },
  areas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  availability: {
    type: DataTypes.STRING,
  },
  motivation: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'inactive'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'volunteers',
  timestamps: true,
});

module.exports = Volunteer;
