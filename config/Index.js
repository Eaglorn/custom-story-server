const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "survival_forest_dev",
  "survival_forest_dev",
  "1352461324qQ",
  {
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = function (name) {
  return {
    sequelize,
    timestamps: false,
    modelName: name,
    freezeTableName: true,
  };
};
