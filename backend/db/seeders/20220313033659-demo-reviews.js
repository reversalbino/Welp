'use strict';

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
   return queryInterface.bulkInsert('Reviews', [
    {
      userId: 1,
      businessId: 1,
      answer: 'This business is okay'
    },
    {
      userId: 1,
      businessId: 1,
      answer: 'This business is good'
    },
    {
      userId: 1,
      businessId: 1,
      answer: 'This business is great'
    },
    {
      userId: 2,
      businessId: 1,
      answer: 'This business is okay 2'
    },
    {
      userId: 1,
      businessId: 2,
      answer: 'This business 2 is good'
    },
   ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
