const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("NODE_SHOP", "admin", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize
