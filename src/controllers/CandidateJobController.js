const jobOpportunity = require("../models/jobOpportunity.js");
const { body, validationResult } = require('express-validator');


module.exports = {

    validateNewJob: [
        body('description', "Descricao não pode estar vazia").trim().isEmpty(),
    ],

    async listOne(req, res){
        const _id = req.params.vagaid
        await jobOpportunity.findOne({_id}, (err, job) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga encontrada'});
            }
            return res.json({job});
        });
    },

    async listAllOpen(req, res){
        const isOpen = true
        await jobOpportunity.find({isOpen}, (err, jobs) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga em aberto'});
            }
            return res.json({jobs});
        });
    }
}

