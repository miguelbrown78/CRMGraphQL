const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

 const conectarDB = async () => {
     try {
        const conectionStr = process.env.DB_MONGO;        
        //console.log(conectionStr);       
        if(conectionStr == undefined ){
            console.log('Cadena de conexión no valida');
        }
        else{
            await mongoose.connect(conectionStr, {
            });
            console.log('DB Conectada');
            }        
        
     } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1); //detiene la app
     }
}

module.exports = conectarDB;