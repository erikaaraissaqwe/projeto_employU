const mongoose = require('mongoose');
const jobOpportunity = require('./jobOpportunity');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    id: String,
    name:String,
    email: String,
    password:String,
    cpf: String,
    curriculum: Curriculum,
    jobOpportunities = [jobOpportunity]
    
});

const modelName = 'Candidate';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}
