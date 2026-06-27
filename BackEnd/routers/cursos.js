const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const db = require('../db')
//const cursos = require('../public/cursos.json'); 

// listar-buscar
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM cursos ORDER BY nome_curso ASC');
        const listarCursos = resultado.rows.map(row => ({
            id: row.id, 
            nomeCurso: row.nome_curso,
            semestres: row.semestres,
            coordenador: row.coordenador
        }));
        res.json(listarCursos);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar cursos.");
    }
});

// inserir
router.post('/', async (req, res) => {
    const { nomeCurso, semestres, coordenador } = req.body;
    try {
        await db.query(
            'INSERT INTO cursos (nome_curso, semestres, coordenador) VALUES ($1, $2, $3)',
            [nomeCurso, semestres, coordenador]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao inserir curso.");
    }
});

// editar
router.put('/:id', async (req, res) => {
    const index = req.params.id; 
    const { nomeCurso, semestres, coordenador } = req.body;
    try {
        const listagem = await db.query('SELECT id FROM cursos ORDER BY nomeCurso ASC');
        const idReal = listagem.rows[index].id;

        await db.query(
            'UPDATE cursos SET nome_curso=$1, semestres=$2, coordenador=$3 WHERE id=$4',
            [nomeCurso, semestres, coordenador, idReal]
        );
                res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao editar curso.");
    }
});

// excluir
router.delete('/:id', async (req, res) => {
    const index = req.params.id;
    try {
        const listagem = await db.query('SELECT id FROM cursos ORDER BY id ASC');
        const idReal = listagem.rows[index].id;
        
        await db.query('DELETE FROM cursos WHERE id = $1', [idReal]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir curso.");
    }
});

module.exports = router;