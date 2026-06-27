require('dotenv').config(); 

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ola');
});

app.get('/marcio', (req, res) => {
    res.send('Ola Marcio Oliveira');
});

app.use('/', require('./routers/index.js')); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});