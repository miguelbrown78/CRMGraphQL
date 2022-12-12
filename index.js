
//importamos librerias apollo y gql
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//conectar a la db
conectarDB();  

//creamos un servidor
const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({req}) => {
        // console.log(req.headers['authorization'])

        // console.log(req.headers);

        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
                // console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error');
                console.log(error);
            }
        }
    }
});

//arrancamos el servidor local
/*
server.listen().then(({url}) =>{
     console.log(`Servidor listo en la URL ${url}`)
})
*/

//arrancamos el servidor HEROKU
server.listen({ port: process.env.PORT || 4000 }).then(({url}) =>{
    console.log(`Servidor listo en la URL ${url}`)
})




