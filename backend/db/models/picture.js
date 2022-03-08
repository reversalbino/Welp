'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    businessId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
  };
  return Picture;
};