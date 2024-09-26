const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/evalMongo");
        console.log("connexion mongo réussie!");
    }catch(error){
        console.error("connexion echouée : " + error.message);
    }
}

module.exports= {connect};