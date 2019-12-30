"use strict";

module.exports = {
 up: (queryInterface, Sequelize) => {
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return queryInterface.bulkInsert(
   "categories",
   [
    {
     name: "Sport"
    },
    {
     name: "Music"
    },
    {
     name: "Science"
    },
    {
     name: "Programming"
    }
   ],
   {}
  );
 },

 down: (queryInterface, Sequelize) => {
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
 }
};
