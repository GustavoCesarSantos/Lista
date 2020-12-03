const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(connection) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, { sequelize: connection })
  }

  static associate(model) {
    this.hasMany(model.Lists, { foreignKey: 'userId', as: 'Lists'})
  }
}

module.exports = Users;