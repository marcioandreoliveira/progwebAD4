const express = require ('express');
const router = express.Router();
const fs = require('fs');

const professores = require ('../public/professores.json') 
router.get ('/' , (req, res) => {
    res.json(professores);
});

//router.get('/:id', (req, res) => {
//    const professor = professores[req.params.id];
//    res.json(professor);
//});

router.post('/', (req, res) => {
    const novoProfessor = req.body;
    professores.push(novoProfessor); 
    fs.writeFileSync('./public/professores.json', JSON.stringify(professores, null, 2));
    res.json(professores);
});

router.put('/:id', (req, res) => {
    const index = req.params.id;
    professores[index] = req.body;     
    fs.writeFileSync('./public/professores.json', JSON.stringify(professores, null, 2));
    res.json(professores);
});

router.delete('/:id', (req, res) => {
    const index = req.params.id;
    professores.splice(index, 1); 
    fs.writeFileSync('./public/professores.json', JSON.stringify(professores, null, 2));
    res.json(professores);
});

module.exports = router;