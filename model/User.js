const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM('admin', 'moderator', 'vip', 'user'),
      defaultValue: 'user',
    },
  },
  db('users')
);

module.exports = User;
