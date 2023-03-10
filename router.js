const multer = require('multer');
const upload = multer({dest:'public/img/cartazes'});

// Importando express
const express = require('express');

const PaginasController = require('./controllers/PaginasController');
const FilmesController = require('./controllers/FilmesController');


// Criando router
const router = express.Router();


router.get('/', PaginasController.showIndex);

router.get('/filme/create', PaginasController.create);

router.get('/filme/:id', PaginasController.showFilme);

router.get('/busca', PaginasController.buscarFilmes);

router.post('/adm/filme/store', upload.single('cartaz'), PaginasController.createFilme);



router.get('/adm/filmes/:id/edit', PaginasController.editFilme);
router.post('/adm/filmes/:id/update', PaginasController.updateFilme);



// Exportando router
module.exports = router;
