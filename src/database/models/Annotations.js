const { Model, DataTypes } = require('sequelize')

class Annotations extends Model {
  static init (connection) {
    super.init({
      data: DataTypes.STRING
    }, { sequelize: connection })
  }

  static associate (model) {
    this.belongsTo(model.Lists, { foreignKey: 'listId', as: 'Lists' })
  }
}

module.exports = Annotations
