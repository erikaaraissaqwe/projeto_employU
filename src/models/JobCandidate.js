const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const JobCandidateSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobOpportunity"
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },
    isRunning: Boolean,
    companyFeedback: String,
    candidateFeedback: String
});

const modelName = 'JobCandidate';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, JobCandidateSchema);
}