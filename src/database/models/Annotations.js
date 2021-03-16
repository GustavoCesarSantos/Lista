'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Annotations extends Model {
    static associate (models) {
      Annotations.belongsTo(models.Lists, { foreignKey: 'listId', as: 'Lists' })
    }
  };
  Annotations.init({
    contents: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Annotations'
  })
  return Annotations
}
