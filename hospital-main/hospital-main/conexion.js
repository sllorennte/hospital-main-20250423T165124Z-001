const mongoose = require('mongoose');
async function conectar(){
    try{
        await mongoose.connect('mongodb://localhost:27017/hospital')
        console.log('conectado a la base de datos');
    } catch(error){
        console.log('error al conectar a la base de datos', error);
    }
}
module.exports=conectar;
conectar();