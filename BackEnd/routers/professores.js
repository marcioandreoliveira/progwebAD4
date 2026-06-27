const express = require ('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db')

// listar
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM professores ORDER BY nome_professor ASC');
        const listaProfessores = resultado.rows.map(row => ({
            id: row.id,
            nomeProfessor: row.nome_professor,
            email: row.email,
            sala: row.sala,
            cursoInscrito: row.curso_inscrito
        }));
        res.json(listaProfessores);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar professores.");
    }
});

// inserir
router.post('/', async (req, res) => {
    const { nomeProfessor, email, sala, cursoInscrito } = req.body;
    try {
        await db.query(
            'INSERT INTO professores (nome_professor, email, sala, curso_inscrito) VALUES ($1, $2, $3, $4)',
            [nomeProfessor, email, sala, cursoInscrito]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao inserir professor: " + err.message); 
    }
});

// editar
router.put('/:id', async (req, res) => {
    const index = req.params.id;
    const { nomeProfessor, email, sala, cursoInscrito } = req.body;
    try {
        const listagem = await db.query('SELECT id FROM professores ORDER BY id ASC');
        const idReal = listagem.rows[index].id;

        await db.query(
            'UPDATE professores SET nome_professor=$1, email=$2, sala=$3, curso_inscrito=$4 WHERE id=$5',
            [nomeProfessor, email, sala, cursoInscrito, idReal]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao editar professor.");
    }
});

// deletar
router.delete('/:id', async (req, res) => {
    const index = req.params.id;
    try {
        const listagem = await db.query('SELECT id FROM professores ORDER BY id ASC');
        const idReal = listagem.rows[index].id;

        await db.query('DELETE FROM professores WHERE id = $1', [idReal]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir professor.");
    }
});

module.exports = router;
