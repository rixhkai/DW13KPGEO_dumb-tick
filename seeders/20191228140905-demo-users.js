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
   "users",
   [
    {
     name: "Udin",
     phone: "+6266666",
     email: "rix@go.id",
     image: "nothing",
     username: "riri",
     password: "1234"
    },
    {
     name: "Andika",
     phone: "+6266666",
     email: "an@go.id",
     image: "nothing",
     username: "andi",
     password: "1234"
    },
    {
     name: "Bill Gates",
     phone: "+6266666",
     email: "bill@go.id",
     image: "nothing",
     username: "billi",
     password: "1234"
    },
    {
     name: "mark sukerbekr",
     phone: "+6266666",
     email: "ma@go.id",
     image: "nothing",
     username: "marks",
     password: "1234"
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
