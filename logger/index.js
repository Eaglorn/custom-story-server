const Sequelize = require("sequelize");
const winston = require("winston");
const WinstonTransportSequelize = require("winston-transport-sequelize");

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

const options = {
  sequelize: sequelize,
  tableName: "log",
  meta: { project: "log" },
  fields: { meta: Sequelize.JSONB },
  modelOptions: { timestamps: false, freezeTableName: true },
};

const logger = new winston.createLogger({
  transports: [new WinstonTransportSequelize(options)],
});

sequelize.sync();

module.exports = logger;
