const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,   
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Sucesso conexao BD');
});

pool.on('error', (err) => {
    console.error('Erro conexao BD', err);
});

const query = (text, params) => {
    return pool.query(text, params);
};

module.exports = {
    query,
    pool
};
