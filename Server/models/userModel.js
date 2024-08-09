// ../models/userModel
const { executeQuery } = require('../database/connectdb.js');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
const createUser = async (user) => {
    const { nombre, apellido, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);  // Encripta la contraseña
    const result = await executeQuery(
        'INSERT INTO users (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', 
        [nombre, apellido, email, hashedPassword]
    );
    
    // Obtiene los detalles del usuario recién creado
    const newUser = await executeQuery(
        'SELECT id, nombre, apellido, email FROM users WHERE id = ?', 
        [result.insertId]
    );
    
    return newUser[0];
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    const rows = await executeQuery('SELECT id, nombre, apellido, email FROM users');
    return rows;
};

// Obtener un usuario por ID
const getUserById = async (id) => {
    const rows = await executeQuery('SELECT id, nombre, apellido, email, twoFA FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
    const rows = await executeQuery('SELECT id, nombre, apellido, email, password FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Función para actualizar el usuario con el secreto 2FA
const updateTwoFactorSecret = async (userId, secret) => {
    const query = 'UPDATE users SET twoFA = ? WHERE id = ?';
    await executeQuery(query, [secret, userId]);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateTwoFactorSecret
};
