const Sequelize = require('sequelize');

module.exports = (connection) => {
  const Annotations = connection.define(
    'Annotations', 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Lists', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }  
    }
  )
  
  return Annotations;
}