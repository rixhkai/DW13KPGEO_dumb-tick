"use strict";
module.exports = (sequelize, DataTypes) => {
 const favorites = sequelize.define(
  "favorites",
  {
   event_id: DataTypes.INTEGER,
   user_id: DataTypes.INTEGER
  },
  {}
 );
 favorites.associate = function(models) {
  // associations can be defined here
  favorites.belongsTo(models.users, {
   as: "createdBy",
   foreignKey: "user_id"
  });
  favorites.belongsTo(models.events, {
   as: "events",
   foreignKey: "event_id"
  });
 };
 return favorites;
};
