'use strict';

const business = require("./business");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Business',
        key: 'id'
      }
    },
    rating: DataTypes.INTEGER,
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'id' });
    Review.belongsTo(models.Business, { foreignKey: 'id' });
  };
  return Review;
};
