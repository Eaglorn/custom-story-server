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

User.sync({ force: true }).then((user) => {
  user.create({
    email: 'admin@customstory.org',
    password: 'f87898910cfac345265dc70c12645133',
    type: 'admin',
  });
});

module.exports = User;
