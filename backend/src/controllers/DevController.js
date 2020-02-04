const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    //função para listar todos os devs
    async index (request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    //função para criar/armazenar dados no banco
    async store (request, response) {

        //capturando o corpo da requisiçao
        const {github_username, techs, latitude, longitude} = request.body;

        //verificar se usuario ja existe
        //busca usuario no banco *OBS: variavel let pode ser sobreposta*
        let dev = await Dev.findOne({github_username});

        //testa se usuario existe
        if(!dev){   
        //acessando API do github
        const apiResponse =  await axios.get(`https://api.github.com/users/${github_username}`)
    
        //atribuindo os dados da API
        const {name = login, avatar_url, bio} = apiResponse.data;
    
        //formatando os tipo string para array
        const techsArray = parseStringAsArray(techs);
        
        //atribuindo localização 
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    
        //atribuindo os dados coletados
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })
    }
        return response.json(dev);
        
    },
    
    async remove (request, response) {
        const github_username = request.body.github_username;
        let dev = await Dev.findOne({github_username});
        console.log(dev._id)
        Dev.findByIdAndRemove(dev._id)
        
        
    },


}