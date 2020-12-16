const jobOpportunity = require("../models/jobOpportunity.js");
const { body, validationResult } = require('express-validator');

module.exports = {

    validateNewJob: [
        body('description', "Descricao não pode estar vazia").trim().notEmpty()
    ],

    async add(req, res){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(errors.array());
        }
        const newJob = {
            description: req.body.description,
            requirements: req.body.requirements,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                state: req.body.address.state
            },
            qualifications: req.body.qualifications,
            additionalInformation: req.body.additionalInformation,
            isOpen: true,
            companyId: req.userId
        }

        await jobOpportunity.create(newJob, (err, job) => {
            if (err){
                return res.json({errorMessage: 'Empresa não encontrada'})
            }
            return res.json({job});
        });
        
    },

    async listOne(req, res){
        const _id = req.params.vagaid
        await jobOpportunity.findOne({_id}, (err, job) => {
            if (err) {
                return res.json({errorMessage:'Vaga nao encontrada'});
            }
            return res.json({job});
        });
    }
}

