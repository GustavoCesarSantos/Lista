/* global process */

const addDays = require('date-fns/addDays');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const allowlistRefreshToken = require('../config/databases/allowlist-refresh-token');
const blocklistAccessTokenHelper = require('./blocklist-access-token');
const ErrorHandler = require('./ErrorHandler');

module.exports = {
	createToken(user) {
		const payload = {
			id: user.id,
		};

		const token = jwt.sign(payload, `${process.env.KEY_JWT}`, {
			expiresIn: '15m',
		});
		return token;
	},

	async verifyToken(token) {
		const exists = await blocklistAccessTokenHelper.verifyIfExistsToken(
			token,
		);

		if (exists) {
			throw new jwt.JsonWebTokenError('Token invalido por logout.');
		}

		const { id } = jwt.verify(token, `${process.env.KEY_JWT}`);
		return id;
	},

	async invalidateToken(token) {
		await blocklistAccessTokenHelper.setToken(token);
	},

	async createOpaqueToken(user) {
		const opaqueToken = crypto.randomBytes(24).toString('hex');
		const expireAt = parseInt(
			(addDays(new Date(), 5).getTime() / 1000).toFixed(0),
			10,
		);
		await allowlistRefreshToken.setToken(opaqueToken, user.id, expireAt);
		return opaqueToken;
	},

	async verifyOpaqueToken(token) {
		if (!token) throw new ErrorHandler('Refresh token não enviado.', 500);

		const id = await allowlistRefreshToken.returnPayload(token);

		if (!id) throw new ErrorHandler('Refresh token inválido.', 500);

		return id;
	},

	async invalidateOpaqueToken(token) {
		await allowlistRefreshToken.deleteToken(token);
	},
};
