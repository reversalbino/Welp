'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.TEXT,
        defaultValue: 'https://ca-times.brightspotcdn.com/dims4/default/2de70b0/2147483647/strip/true/crop/2047x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F98%2F12%2F15b82c96c60129086d57a857ea4b%2Fla-1530651516-vbefwiotmm-snap-image'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Pictures');
  }
};
