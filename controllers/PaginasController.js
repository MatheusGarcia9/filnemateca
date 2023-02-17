const filmes = require('../database/filmes.json');

const PaginasController = {
    showIndex: (req, res)=>{
        
        return res.render('index.ejs', {filmes})
    },

    showFilme: (req, res)=>{
        let id = req.params.id
        
        const filme = filmes.find (f => f.id == id);

        return res.render('filme.ejs', {filme});
    },

}

module.exports = PaginasController;