const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');

const blocklistAccessToken = require('../config/databases/blocklist-access-token');

function generateTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    setToken: async token => {
        const { exp } = jwt.decode(token);
        const tokenHash = generateTokenHash(token);
        await blocklistAccessToken.setToken(tokenHash, '', exp);
    },

    verifyIfExistsToken: async token => {
        const tokenHash = generateTokenHash(token);
        return await blocklistAccessToken.verifyIfExistsToken(tokenHash);
    },
};
