const express = require('express');
const cors = require ('cors')

const app = express();

app.use (cors({
    origin: '*'
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send ('Ola')
})

app.get('/marcio', (req, res) => {
    res.send ('Ola Marcio Oliveira')
})

app.use ('/', require ('./routers'))


app.listen (3000, () => {
    console.log ('Servidor rodando em http://localhost:3000');
});

