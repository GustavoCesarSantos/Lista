'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Annotations extends Model {
    static associate (models) {
      Annotations.belongsTo(models.Lists, { foreignKey: 'listId', as: 'Lists' })
    }
  };
  Annotations.init({
    contents: {
      type: DataTypes.STRING,
      validate: {
        len: [30]
      }
    }
  }, {
    sequelize,
    modelName: 'Annotations'
  })
  return Annotations
}
