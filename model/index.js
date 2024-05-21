const Sequelize = require("sequelize");
const { sequelize } = require("../config/db");

const Order = require("./order");
const OrderItem = require("./orderItem");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models into db object
db.Order = Order;
db.OrderItem = OrderItem;

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
