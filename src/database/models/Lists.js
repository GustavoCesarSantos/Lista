const { Model, DataTypes } = require('sequelize');

class Lists extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
    }, { sequelize: connection })
  }

  static associate(model) {
    this.hasMany(model.Annotations, { foreignKey: 'listId', as: 'Annotations'});
    this.belongsTo(model.Users, { foreignKey: 'userId', as: 'Users' });
  }
}

module.exports = Lists;