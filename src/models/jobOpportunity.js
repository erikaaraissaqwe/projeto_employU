const mongoose = require('mongoose');
const Company = require('./Company');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    id: String,
    company = Company,
    descrption: String,
    requirements: [String],
    adress: {
        street: String,
        number: Int,
        city: String,
        state: String
    },
    qualifications: [String],
    additionalInformation: String
    
});

const modelName = 'JobOpportunity';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}
