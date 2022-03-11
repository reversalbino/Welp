'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Business',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
    }
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
    Picture.belongsTo(models.Business, { foreignKey: 'id' });
  };
  return Picture;
};
