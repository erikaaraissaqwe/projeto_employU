const Empresa = require("../models/Empresa");
const Candidato = require("../models/Candidato");

module.exports={
    async indexedDB(req, res){
        let user;
        switch(type){

            case 'empresa':
            user = await Empresa.findOne({email}).select("password");
            break;

            case 'candidato':
                user = await Candidato.findOne({email}).select("password");
                break;
        }

        if(!user){
            return res.json(({"error": 'SENHA INCORRETA', "status":"400"}));
        }
        
    }
}