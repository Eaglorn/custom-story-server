const { DataTypes, Model } = require('sequelize');
const config = require('../config');

class Users extends Model {}

Users.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM('admin', 'moderator', 'vip', 'user', 'guest'),
    },
  },
  config('users')
);

module.exports = Users;
