"use strict";
module.exports = (sequelize, DataTypes) => {
 const categories = sequelize.define(
  "categories",
  {
   name: DataTypes.STRING,
   image: DataTypes.STRING
  },
  {}
 );
 categories.associate = function(models) {
  // associations can be defined here
  categories.hasMany(models.events, {
   as: "events",
   foreignKey: "category_id"
  });
 };
 return categories;
};
