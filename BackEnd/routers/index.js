const express = require ('express')
const router = express.Router()
router.use ('/professores', require ('./professores'))
router.use ('/cursos', require ('./cursos'))

module.exports = router

