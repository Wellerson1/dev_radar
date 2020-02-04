const {Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

//metode GET para listar todos os devs
routes.get("/devs", DevController.index);

//metodo GET para buscar devs por filtros
routes.get("/search", SearchController.index)

//chama o metodo do controller para o armazenamento no banco
routes.post('/devs', DevController.store );


module.exports = routes;