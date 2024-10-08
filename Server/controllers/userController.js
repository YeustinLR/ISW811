// ../controllers/userController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();


///////////////////// EndPoints  /////////////////////

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            const result = await userModel.createUser({ nombre, apellido, email, password });
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId, nombre, apellido, email });
        } else{
            return res.status(409).json({ message: 'El email ya existe, digita otro.' });
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al registrar el usuario' });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el usuario' });
    }
};


///////////////////// Login  /////////////////////

// Iniciar sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        if (user.twoFA) {
            // Generar un token temporal para 2FA
            const tempToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_TEMP, { expiresIn: '2m' });

            return res.status(200).json({ message: '2FA requerido. Por favor, ingrese su código OTP.', requires2FA: true, tempToken });
        } else {
            // Si no tiene 2FA, generar un JWT normal y devolverlo
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error interno del servidor al iniciar sesión' });
    }
};




///////////////////// 2FA  /////////////////////

// Generar y enviar código QR para 2FA
const generate2FAQRCode = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const secret = speakeasy.generateSecret();
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
        // Guardar el secreto en el usuario
        await userModel.updateTwoFactorSecret(userId, secret.base32);

        res.status(200).json({ qrCodeUrl, secret: secret });
    } catch (error) {
        console.error('Error al generar QR para 2FA:', error);
        res.status(500).json({ message: 'Error interno del servidor al generar QR para 2FA' });
    }
};

// Verificar el código OTP ingresado por el usuario
const verify2FACode = async (req, res) => {
    try {
        const {otpCode} = req.body;
        const userId = req.user.userId;
        const user = await userModel.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (!user.twoFA) {
            return res.status(404).json({ message: 'Secreto 2FA no encontrado' });
        }
        const verified = speakeasy.totp.verify({
            secret: user.twoFA,
            encoding: 'base32',
            token: otpCode
        });

        if (verified) {
            // Generar el token JWT definitivo
            const jwtToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Código OTP verificado exitosamente', token: jwtToken });
        } else {
            return res.status(400).json({ message: 'Código OTP inválido' });
        }

    } catch (error) {
        console.error('Error al verificar código OTP para 2FA:', error);
        return res.status(500).json({ message: 'Error interno del servidor al verificar código OTP para 2FA' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    generate2FAQRCode,
    verify2FACode
};
