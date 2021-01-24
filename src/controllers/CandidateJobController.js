const jobOpportunity = require("../models/jobOpportunity.js");
const jobCandidate = require("../models/jobCandidate.js");
const jobCompany = require("../models/Company.js")
const { body, validationResult } = require('express-validator');


module.exports = {

    validateNewJob: [
        body('description', "Descricao não pode estar vazia").trim().isEmpty(),
    ],

    async listOne(req, res){
        const _id = req.params.vagaId
        await jobOpportunity.findOne({_id}).lean().exec((err, job) => {
            if (err || job == null) {
                return res.json({errorMessage:'Nenhuma vaga encontrada'});
            }
            jobCompany.findOne({ _id: job.companyId }, (err, cpy) =>{
                if (err){
                    return res.json({errorMessage:err})
                }
                job.company = cpy;
                return res.json({job});
            });
        });
    },

    async listAllOpen(req, res){
        const isOpen = true
        await jobOpportunity.find({isOpen}).lean().exec((err, jobs) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga em aberto'});
            }
            idList = jobs.map((jobs)=>{return jobs['companyId']})
            jobCompany.find({ _id: { $in: idList } }, (err, cpy) =>{
                if (err){
                    return res.json({errorMessage:err})
                }
                jobs.forEach(ja => {
                    ja.company = cpy.find(e => e._id.toString() == ja.companyId.toString());
                });
                return res.json({jobs});
            });
        });
    },

    async applyForJob(req, res) {
        const jobApplyed = {
            jobId: req.params.vagaid,
            candidateId: req.userId,
            isRunning: true
        }

        await jobCandidate.create(jobApplyed, (err, jobA) => {
            if (err){
                return res.json({errorMessage: err})
            }
            return res.json({jobA});
        });
    },

    async cancelApplication(req, res) {
        const isRunning= false
        const jobId = req.params.vagaid
        await jobCandidate.findOneAndUpdate(jobId, isRunning, (err, jobA) =>{
            if (err){
                return res.json({errorMessage:err});
            }
            return res.json({jobA});
        });
    },

    async feedback(req, res) {
        const jobFeed = { candidateId: req.userId, jobId: req.params.vagaId}; 
        let jobCand = await jobCandidate.findOne(jobFeed, (err, jobCand) => {
            if (err) {
                return res.json({errorMessage:'Não existe usuario com esse id cadastrado em uma vaga'});
            }
            return jobCand;
        }); 
        let feedback = await jobCandidate.findOneAndUpdate({"_id": jobCand._id},{"candidateFeedback":req.body.msg}, (err, feedback) => {
            if (err) {
                return res.json({errorMessage:err});
            }
            return feedback._id;
        });
        await jobCandidate.findOne(feedback, (err, jobCand) => {
            if (err) {
                return res.json({errorMessage:err});
            }
            return res.send({jobCand});
        }); 
    },
    
    async listAllApplied(req, res) {
        const candidateId = req.userId;
        await jobCandidate.find({candidateId}).lean().exec((err, jobA) => {
            if (err){
                return res.json({errorMessage:err});
            }
            idList = jobA.map((jobA)=>{return jobA['jobId']})
            jobOpportunity.find({ _id: { $in: idList } }, (err, jbs) =>{
                if (err){
                    return res.json({errorMessage:err})
                }
                jobA.forEach(ja => {
                    ja.job = jbs.find(e => e._id.toString() == ja.jobId.toString());
                });
                idList = jbs.map((jbs) => {return jbs.companyId})
                jobCompany.find({_id: {$in: idList}},(err, cpy) => {
                    if (err){
                        return res.json({errorMessage:err})
                    }
                    const jobs = [];
                    jobA.forEach(ja => {
                        ja = JSON.parse(JSON.stringify(ja.job));
                        ja.company = cpy.find(e => e._id.toString() == ja.companyId.toString());
                        jobs.push(ja);
                    });
                    return res.json({jobs});
                });
            });
        });
        
    }
}

