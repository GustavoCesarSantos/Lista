const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		static associate(models) {
			Users.hasMany(models.Lists, { foreignKey: 'userId', as: 'Lists' });
		}
	}
	Users.init(
		{
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			verifiedEmail: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Users',
		},
	);
	return Users;
};
