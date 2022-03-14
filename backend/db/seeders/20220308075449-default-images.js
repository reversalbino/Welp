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
  return queryInterface.bulkInsert('Pictures', [
    {
      businessId: 1,
      url: 'https://ca-times.brightspotcdn.com/dims4/default/2de70b0/2147483647/strip/true/crop/2047x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F98%2F12%2F15b82c96c60129086d57a857ea4b%2Fla-1530651516-vbefwiotmm-snap-image'
    },
    {
      businessId: 2,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7v-JHb0EB2O_Y7bZVXPltFS0k38h_gijb9hKw1I_Nah-g_AiyDdfCjG5BHrcS0R4Gf0&usqp=CAU'
    },
    {
      businessId: 3,
      url: 'https://erepublic.brightspotcdn.com/dims4/default/243baed/2147483647/strip/true/crop/406x197+0+43/resize/1440x700!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.amazonaws.com%2F47%2Fee%2Fdce9bc755df743659d7b3d9e9dd1%2Ffoodinspectiondata-cfa.jpg'
    },
    {
      businessId: 4,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXYIbfUfYPnMTitlP93_5BTl8iR9VU-MI2sw&usqp=CAU'
    },
    {
      businessId: 5,
      url: 'https://ca-times.brightspotcdn.com/dims4/default/2de70b0/2147483647/strip/true/crop/2047x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F98%2F12%2F15b82c96c60129086d57a857ea4b%2Fla-1530651516-vbefwiotmm-snap-image'
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
    return queryInterface.bulkDelete('Pictures', null, {});
  }
};
