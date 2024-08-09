// /server.js
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();  

const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { checkDB } = require('./database/connectdb.js');

// Establece la conexión a la base de datos
checkDB();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);

// Prueba
app.get('/', (req, res) => {
  res.send('Hola,');
});

// Establece la conexión al servidor
const port = process.env.PORT || 3000; 
const host = process.env.SERVER_HOST || 'localhost'; 

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://${host}:${port}`);
});
