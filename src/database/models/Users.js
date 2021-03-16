'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate (models) {
      Users.hasMany(models.Lists, { foreignKey: 'userId', as: 'Lists' })
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verifiedEmail: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users'
  })
  return Users
}
