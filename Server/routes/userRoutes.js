// ../routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidations, loginValidations } = require('../validations/userValidation');
const { validateRequest } = require('../middlewares/validateRequest');
const { authenticateToken, authenticateTokenTemp } = require('../middlewares/authMiddleware');


// Ruta para registrar un nuevo usuario
router.post('/register', registerValidations, validateRequest, userController.registerUser);

// Ruta para iniciar sesión
router.post('/login', loginValidations, validateRequest, userController.loginUser);

// Ruta para obtener todos los usuarios
router.get('/getall', userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/get/:id', userController.getUserById);

////////////////////////////////////////////////
// Ruta protegida que requiere autenticación
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Acceso a perfil exitoso', user: req.user });
});

////////////////////////////////////////////////
// Ruta para generar y enviar código QR para 2FA
router.get('/2fa/setup', authenticateToken, userController.generate2FAQRCode);

// Ruta para verificar el código OTP ingresado
router.post('/2fa/verify', authenticateTokenTemp, userController.verify2FACode);



module.exports = router;
