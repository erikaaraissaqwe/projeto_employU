const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CandidateSchema = new mongoose.Schema({
    name:String,
    email: String,
    password:String,
    cpf: String
});

const modelName = 'Candidate';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, CandidateSchema);
}
