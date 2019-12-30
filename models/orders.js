"use strict";
module.exports = (sequelize, DataTypes) => {
 const orders = sequelize.define(
  "orders",
  {
   event_id: DataTypes.INTEGER,
   user_id: DataTypes.INTEGER,
   quantity: DataTypes.INTEGER,
   total_price: DataTypes.INTEGER,
   status: DataTypes.STRING,
   attachment: DataTypes.STRING
  },
  {}
 );
 orders.associate = function(models) {
  // associations can be defined here
  orders.belongsTo(models.users, {
   as: "user",
   foreignKey: "user_id"
  });
  orders.hasMany(models.events, {
   as: "event",
   foreignKey: "event_id"
  });
 };
 return orders;
};
