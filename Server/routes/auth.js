const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitterController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Ruta para iniciar la autenticación con Twitter
router.get('/twitter',  twitterController.authenticateTwitter);

// Ruta de callback para cuando Twitter redirige de vuelta a tu aplicación
router.get('/twitter/callback',  twitterController.twitterCallback);

// Ruta para crear tweet
router.post('/tweet', authenticateToken, twitterController.postTweet);

// Ruta para guardar tokens en bd
router.post('/save-tokens', authenticateToken, twitterController.saveTwitterTokens);

module.exports = router;
