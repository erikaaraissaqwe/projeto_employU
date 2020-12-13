const Candidate = require("../models/Candidate");
const Curriculum = require("../models/Curriculum");

module.exports = {

    async store(req, res){
        
        const {fileProfile} = req.files;
        const address = req.body.address;
        const {professionalExperiences} = req.body;
        const {academicFormations} = req.body;
        const {user_id} = req.headers;

        const candidate = await Candidate.findById(user_id);

        if(!candidate){
            return res.status(400).json({errorMessage : 'não existe esse usuário'});
        }
        console.log(fileProfile);
        console.log(address);
        console.log(user_id);
        console.log(professionalExperiences);
        console.log(academicFormations);

        const curriculum = await Curriculum.create({
            user : user_id,
            fileProfile,
            address,
            professionalExperience : professionalExperiences.split(',').map(tech => tech.trim()),
            academicFormation : academicFormations.split(',').map(formation => formation.trim())
        })

        return res.json(curriculum);
    }

}

