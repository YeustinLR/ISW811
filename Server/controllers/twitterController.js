const twitterModel = require('../models/twitterModel');
const { TwitterApi } = require('twitter-api-v2');
const passport = require('passport');


// Iniciar autenticación con Twitter
exports.authenticateTwitter = passport.authenticate('twitter');

// Callback de Twitter para autenticación
exports.twitterCallback = (req, res) => {
    passport.authenticate('twitter', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la autenticación' });
        }
        try {
            // Obtener los tokens
            const { token, tokenSecret } = user;

            // Redirigir al cliente con los tokens en la URL
            const redirectUrl = `http://localhost:3000/saveTokens?accessToken=${token}&accessTokenSecret=${tokenSecret}`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error al redirigir con los tokens de Twitter:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    })(req, res);
};


// Publicar tweet
exports.postTweet = async (req, res) => {
    const { status } = req.body;
    const user = await twitterModel.getUserByToken(req.user.userId);

    if (!user) {
        return res.status(401).json({ message: 'Tu cuenta no esta vinculada.' });
    }
    const tokens = await twitterModel.getTwitterTokensByUserId(req.user.userId);
    

    if (!status) {
        return res.status(400).send('El contenido del tweet es requerido');
    }

    try {
        if (!tokens) {
            return res.status(404).json({ message: 'Tokens de Twitter no encontrados. Vincula tu cuenta primero.' });
        }

        // Configura el cliente de Twitter con los tokens específicos del usuario
        const client = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: tokens.accessToken,
            accessSecret: tokens.accessTokenSecret,
        });

        // Publica el tweet en Twitter
        await client.v2.tweet(status);
        res.send('Tweet publicado exitosamente');
    } catch (error) {
        console.error('Error al publicar el tweet:', error);
        res.status(500).send('Error al publicar el tweet');
    }
};

// Controlador para guardar tokens de Twitter
exports.saveTwitterTokens = async (req, res) => {
    const { accessToken, accessTokenSecret } = req.body;
    const userId = req.user.userId;
    const existingUser = await twitterModel.getUserByToken(userId);
    if(existingUser){
        await twitterModel.updateTwitterTokens(accessToken, accessTokenSecret, userId);
        return res.status(200).json({ message: 'Tokens de Twitter guardados exitosamente' });

    }

    // Verificar que todos los campos necesarios estén presentes
    if (!userId || !accessToken || !accessTokenSecret) {
        return res.status(400).json({ message: 'Todos los campos (userId, accessToken, accessTokenSecret) son requeridos' });
    }

    try {
        // Guardar los tokens en la base de datos
        await twitterModel.saveTwitterTokens(userId, accessToken, accessTokenSecret);
        res.status(200).json({ message: 'Tokens de Twitter guardados exitosamente' });
    } catch (error) {
        console.error('Error al guardar los tokens de Twitter:', error);
        res.status(500).json({ message: 'Error al guardar los tokens de Twitter' });
    }
};
