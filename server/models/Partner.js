const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Partner = sequelize.define('Partner', {
  name:             { type: DataTypes.STRING, allowNull: false },
  email:            { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  organization:     { type: DataTypes.STRING },
  partnerType:      { type: DataTypes.ENUM('Church', 'NGO', 'Business', 'School', 'Individual'), defaultValue: 'Individual' },
  partnershipAreas: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  message:          { type: DataTypes.TEXT },
  status:           { type: DataTypes.ENUM('pending', 'active', 'inactive'), defaultValue: 'pending' },
}, {
  tableName: 'partners',
  timestamps: true,
});

module.exports = Partner;
