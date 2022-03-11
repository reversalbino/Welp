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
   return queryInterface.bulkInsert('Businesses', [
    {
      ownerId: 1,
      "address": "Willow Lane",
      "city": "Grayslake",
      "description": "This is the default description for a business.",
      "latitude": -67.479243,
      "longitude": 15.412725,
      "state": "Iowa",
      "title": "Ganjacone",
      "zipCode": "16772"
    },
    {
      ownerId: 1,
      "address": "Smith Street",
      "city": "Columbia City",
      "description": "This is the default description for a business.",
      "latitude": -48.771057,
      "longitude": 8.08228,
      "state": "Missouri",
      "title": "Rank-way",
      "zipCode": "93250"
    },
    {
      ownerId: 2,
      "address": "Water Street",
      "city": "Southington",
      "description": "This is the default description for a business.",
      "latitude": 14.518493,
      "longitude": 47.525952,
      "state": "Hawaii",
      "title": "Xx-volphase",
      "zipCode": "80804"
    },
    {
      ownerId: 3,
      "address": "Fulton Street",
      "city": "Longdale",
      "description": "This is the default description for a business.",
      "latitude": -19.587919,
      "longitude": -117.482797,
      "state": "North Dakota",
      "title": "Runaptex",
      "zipCode": "48358"
    },
    {
      ownerId: 3,
      "address": "Fairview Road",
      "city": "Calhan",
      "description": "This is the default description for a business.",
      "latitude": 56.204354,
      "longitude": -15.550956,
      "state": "Indiana",
      "title": "Zaamdrill",
      "zipCode": "14117"
    }
   ]);
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
