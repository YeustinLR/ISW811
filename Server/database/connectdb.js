const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();  // Carga las variables de entorno

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 20 // Ajusta este valor según tus necesidades
});

// Función para ejecutar consultas SQL de manera segura y eficiente
const executeQuery = async (query, params) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(query, params);
        return result;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', { query, params, error });
        throw new Error('Error al ejecutar la consulta en la base de datos');
    } finally {
        connection.release(); 
    }
};

// Función para verificar la conexión a la base de datos
const checkDB = async () => {
    try {
        // Intenta obtener una conexión del pool
        const connection = await pool.getConnection();
        connection.release();
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);  // Finaliza el proceso si no se puede conectar a la base de datos
    }
};

module.exports = {
    pool,
    checkDB,
    executeQuery 
};
