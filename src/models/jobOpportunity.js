const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    description: String,
    requirements: [String],
    address: {
        street: String,
        number: Number,
        city: String,
        state: String
    },
    qualifications: [String],
    additionalInformation: String,
    isOpen: Boolean,
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
});

const modelName = 'JobOpportunity';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}
