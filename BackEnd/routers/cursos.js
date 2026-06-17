const express = require('express');
const router = express.Router();
const fs = require('fs'); 

const cursos = require('../public/cursos.json'); 

router.get('/', (req, res) => {
    res.json(cursos);
});

router.post('/', (req, res) => {
    cursos.push(req.body);
    fs.writeFileSync('./public/cursos.json', JSON.stringify(cursos, null, 2));
    res.json(cursos);
});

router.put('/:id', (req, res) => {
    const index = req.params.id;
    cursos[index] = req.body;     
    fs.writeFileSync('./public/cursos.json', JSON.stringify(cursos, null, 2));
    res.json(cursos);
});

router.delete('/:id', (req, res) => {
    const index = req.params.id;
    cursos.splice(index, 1);     
    fs.writeFileSync('./public/cursos.json', JSON.stringify(cursos, null, 2));
    res.json(cursos);
});

module.exports = router;