const jobOpportunity = require("../models/jobOpportunity.js");
const jobCandidate = require("../models/jobCandidate.js");
const candidate = require("../models/Candidate");
const { body, validationResult } = require('express-validator');
const Curriculum = require("../models/Curriculum");

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
    },

    async closeJob(req, res){
        const vagaId = {"_id": req.params.vagaid};
        const isOpen = {"isOpen": false};
        await jobOpportunity.findOneAndUpdate(vagaId, isOpen, (err) =>{
            if (err){
                return res.json({errorMessage:err});
            }
        });
        await jobOpportunity.findOne(vagaId, (err,job) =>{
            if (err){
                return res.json({errorMessage:err})
            }
            return res.json({job})
        });
    },

    async listCandidates(req, res){
        const filter = {
            jobId: req.params.vagaId,
            isRunning: true
        }
        await jobCandidate.find(filter, 'candidateId -_id', (err, candidateIds) => {
            if (err){
                return res.json({errorMessage:err})
            }
            idList = candidateIds.map((candidateIds)=>{return candidateIds['candidateId']})
            candidate.find({ _id: { $in: idList } }, (err, candidates) => {
                if (err){
                    return res.json({errorMessage:err})
                }
                return res.json({candidates})
            });
        });
    },

    async candidateInfo(req, res){
        const filter = {
            jobId: req.params.vagaId,
            candidateId: req.params.candidatoId
        }
        await jobCandidate.findOne(filter, 'candidateId -_id', (err, candidateId) => {
            if (err){
                return res.json({errorMessage:err})
            }
            candidate.findOne(candidateId, (err, candidateObj) => {
                if (err){
                    return res.json({errorMessage:err})
                }
                const resume = Curriculum.findOne({user: candidateId['candidateId']})
                return res.json({candidateObj, resume})
            });
        });
    }
}

