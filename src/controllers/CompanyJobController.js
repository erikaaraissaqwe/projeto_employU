const jobOpportunity = require("../models/jobOpportunity.js");
const jobCandidate = require("../models/jobCandidate.js");
const jobCompany = require("../models/Company.js")
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
        const _id = req.params.vagaId
        await jobOpportunity.findOne({_id}).lean().exec((err, job) => {
            if (err) {
                return res.json({errorMessage:'Vaga nao encontrada'});
            }
            jobCompany.findOne({ _id: req.userId }, (err, cpy) =>{
                if (err){
                    return res.json({errorMessage:err})
                }
                job.company = cpy;
                return res.json({job});
            });
        });
    },

    async listAllOpen(req, res){
        const jobC = { companyId: req.userId, isOpen: true}; 
        await jobOpportunity.find(jobC).lean().exec((err, jobs) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga em aberto'});
            }
            jobCompany.findOne({ _id: req.userId }, (err, cpy) =>{
                if (err){
                    return res.json({errorMessage:err})
                }
                jobs.forEach(ja => {
                    ja.company = cpy;
                });
                return res.json({jobs});
            });
            //return res.json({jobs});
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
    },

    async feedback(req, res) {
        const jobFeed = { jobId: req.params.vagaId}; 
        await jobCandidate.updateMany(jobFeed, {"companyFeedback":req.body.msg}, (err, feedback) => {
            if (err) {
                return res.json({errorMessage:err});
            }
            return feedback._id;
        });
    }
}

