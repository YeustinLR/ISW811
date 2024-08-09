const { body } = require("express-validator");
const registerValidations = [
    body("nombre")
        .isString()
        .withMessage("El nombre debe ser un texto")
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),
    body("apellido")
        .isString()
        .withMessage("El apellido debe ser un texto")
        .notEmpty()
        .withMessage("El apellido no puede estar vacío")
        .isLength({ min: 3 })
        .withMessage("El apellido debe tener al menos 3 caracteres"),
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("password")
        .isString()
        .withMessage("La contraseña debe ser un texto")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
];

const loginValidations = [
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("password")
        .isString()
        .withMessage("La contraseña debe ser un texto")
        .notEmpty()
        .withMessage("La contraseña no puede estar vacía"),
];

module.exports = { registerValidations, loginValidations };
