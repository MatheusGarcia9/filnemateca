// Importando express
const express = require('express');

const PaginasController = require('./controllers/PaginasController');
const FilmesController = require('./controllers/FilmesController');


// Criando router
const router = express.Router();


router.get('/', PaginasController.showIndex);

router.get('/filme/create', FilmesController.create);

router.get('/filme/:id', PaginasController.showFilme);


// Exportando router
module.exports = router;
