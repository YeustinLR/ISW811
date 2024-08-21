const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const twitterRoutes = require('./routes/auth.js');
const { checkDB } = require('./database/connectdb.js');

// Establece la conexión a la base de datos
checkDB();

// Configuración de la sesión - DEBE SER ANTES DE CUALQUIER USO DE passport
app.use(session({
  secret: process.env.SESSION_SECRET,  // Clave secreta para firmar las cookies de sesión
  resave: false,
  saveUninitialized: true,
}));

// Inicializa Passport y usa la sesión
require('./config/passport');  // Carga la configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas - DEBEN SER DESPUÉS DE LA INICIALIZACIÓN DE passport
app.use('/api/users', userRoutes);
app.use('/auth', twitterRoutes);

// Prueba
app.get('/', (req, res) => {
  res.send('Hola,');
});

// Establece la conexión al servidor
const port = process.env.PORT || 5000; 
const host = process.env.SERVER_HOST || 'localhost'; 

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://${host}:${port}`);
});
