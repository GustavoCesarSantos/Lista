'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    static associate (models) {
      Lists.hasMany(models.Annotations, { foreignKey: 'listId', as: 'Annotations' })
      Lists.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' })
    }
  };
  Lists.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Lists'
  })
  return Lists
}
