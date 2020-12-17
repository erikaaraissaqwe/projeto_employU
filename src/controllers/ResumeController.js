const Candidate = require("../models/Candidate");
const Curriculum = require("../models/Curriculum");

module.exports = {

    async create(req, res){
        
        const {address} = req.body;
        const {professionalExperiences} = req.body;
        const {academicFormations} = req.body;
        const {user_id} = req.headers;
        const candidate = await Candidate.findById(user_id);
        let fileProfile = null;
        
        if(!candidate){
            return res.status(400).json({errorMessage : 'não existe esse usuário'});
        }

        if(!req.file){
            fileProfile = null;
        }
        else{
            fileProfile = req.file.filename;
        }

        if(!(isEmpty(address)) || !(isEmpty(professionalExperiences)) || !(isEmpty(academicFormations))){
            return res.status(400).json({errorMessage : 'há campos vazios'});
        }

        const curriculum = await Curriculum.create({
            user : user_id,
            fileProfile,
            address : address.trim(),
            professionalExperience : professionalExperiences.split(',').map(tech => tech.trim()),
            academicFormation : academicFormations.split(',').map(formation => formation.trim())
        });

        return res.json(curriculum);
    },

    async edite(req, res){
        
        const {address} = req.body;
        const {professionalExperiences} = req.body;
        const {academicFormations} = req.body;
        const {user_id} = req.headers;
        let fileProfile = null;

        if(!req.file){
            fileProfile = null;
        }
        else{
            fileProfile = req.file.filename;
        }

        if(!(isEmpty(address)) || !(isEmpty(professionalExperiences)) || !(isEmpty(academicFormations))){
            return res.status(400).json({errorMessage : 'há campos vazios'});
        }

        let curriculum = await Curriculum.findOne({user : user_id});

        if(!curriculum){
            return res.status(400).json({errorMessage : 'Não foi encontrado um currículo'});
        }
        
        await Curriculum.updateOne({_id:curriculum.id},{$set:{
            fileProfile,
            address : address.trim(),
            professionalExperience : professionalExperiences.split(',').map(tech => tech.trim()),
            academicFormation : academicFormations.split(',').map(formation => formation.trim())
        }
        });
        curriculum = await Curriculum.findOne({user : user_id});
        return res.json(curriculum);
    },

    async list(req, res){
        const {user_id} = req.headers;
        await Curriculum.findOne({user : user_id}, (err, curriculum) => {
            if (err) {
                return res.json({errorMessage:'Currículo nao encontrado'});
            }
            return res.json({curriculum});
        });
    }
}

function isEmpty(string){
    return string.trim();
}

