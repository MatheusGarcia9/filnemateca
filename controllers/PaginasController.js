const filmes = require('../database/filmes.json');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const PaginasController = {
    showIndex: (req, res)=>{
        
        return res.render('index.ejs', {filmes})
    },

    showFilme: (req, res)=>{
        let id = req.params.id
        
        const filme = filmes.find (f => f.id == id);

        return res.render('filme.ejs', {filme});

    },

    create: (req, res) =>{
        res.render('filme-create.ejs');
    },

    editFilme: (req, res) =>{
        let id = req.params.id
        
        const filme = filmes.find (f => f.id == id);

        res.render('filme-edit.ejs', {filme});
    },  

    updateFilme: (req, res)=>{

    },

    buscarFilmes: (req, res) =>{

        let trecho = req.query.busca;
        let censura = req.query.censura;

        let filtradora = filme => {
            let tituloOk = filme.titulo.toLowerCase().includes(trecho.toLowerCase());
            //let censuraOk = filme.censura <= censura;
            return tituloOk;
        }

        let filmesFiltrados = filmes.filter(filtradora);
        

        return res.render("index.ejs", {filmes: filmesFiltrados});            
        
    },
    addFilme: (req, res) => {
        console.log(req.body);
        const filme = {
            titulo: req.body.titulo,
            generos: req.body.generos,
            censura: req.body.censura,
            sinopse: req.body.sinopse,
            cartaz: req.body.cartaz,
            trailer: req.body.trailer,
        }

        filmes.push(filme);
        
        fs.writeFileSync(pathFilmes, JSON.stringify(filmes, null, 4));

        return res.redirect('/')
    },
    
    createFilme: (req,res) => {
        let novoNome = `${Date.now()}-${req.file.originalname}`
        fs.renameSync(req.file.path, `public/img/cartazes/${novoNome}`);
        const filme = {
            "id": uuid.v4(),
            "cartaz": novoNome,
            "titulo": req.body.titulo,
            "generos": req.body.generos,
            "censura": req.body.censura,
            "trailer": req.body.trailer,
            "sinopse": req.body.sinopse
        }

        filmes.push(filme);
        fs.writeFileSync(path.resolve(__dirname + '/../database/filmes.json'), JSON.stringify(filmes, null, 4));

        res.redirect('/');

    }
}

module.exports = PaginasController;