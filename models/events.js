"use strict";
module.exports = (sequelize, DataTypes) => {
 const events = sequelize.define(
  "events",
  {
   title: DataTypes.STRING,
   category_id: DataTypes.INTEGER,
   start_time: DataTypes.DATE,
   end_time: DataTypes.DATE,
   price: DataTypes.INTEGER,
   description: DataTypes.STRING,
   address: DataTypes.STRING,
   url_maps: DataTypes.STRING,
   image: DataTypes.STRING,
   creator_id: DataTypes.INTEGER
  },
  {}
 );
 events.associate = function(models) {
  // associations can be defined here
  events.belongsTo(models.categories, {
   as: "category",
   foreignKey: "category_id"
  });
  events.belongsTo(models.users, {
   as: "createdBy",
   foreignKey: "creator_id"
  });
 };
 return events;
};
