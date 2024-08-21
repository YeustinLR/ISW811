const { executeQuery } = require('../database/connectdb');

// Guardar tokens de Twitter en la base de datos
const saveTwitterTokens = async (userId, accessToken, accessTokenSecret) => {
    const query = 'INSERT INTO tokenTwitter (id_user, accessToken, accessTokenSecret) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE accessToken = VALUES(accessToken), accessTokenSecret = VALUES(accessTokenSecret)';
    await executeQuery(query, [userId, accessToken, accessTokenSecret]);
};

// Obtener tokens de Twitter por ID de usuario
const getTwitterTokensByUserId = async (userId) => {
    const query = 'SELECT accessToken, accessTokenSecret FROM tokenTwitter WHERE id_user = ?';
    const rows = await executeQuery(query, [userId]);
    return rows[0];
};
// Obtener un usuario por email
const getUserByToken = async (id) => {
    const rows = await executeQuery('SELECT id_user FROM tokenTwitter WHERE id_user = ?', [id]);
    return rows[0];
};
// Guardar tokens de Twitter en la base de datos
const updateTwitterTokens = async (accessToken, accessTokenSecret, userId) => {
    const query = 'UPDATE tokenTwitter SET accessToken = ?, accessTokenSecret = ? WHERE id_user = ?';
    await executeQuery(query, [accessToken, accessTokenSecret, userId]);
};


module.exports = {
    saveTwitterTokens,
    getTwitterTokensByUserId,
    getUserByToken,
    updateTwitterTokens
};
