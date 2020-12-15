const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CurriculumSchema = new mongoose.Schema({
    address:String,
    professionalExperience: [String],
    academicFormation: [String],
    fileProfile : String,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Candidate'
    }
    
});

const modelName = 'Curriculum';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, CurriculumSchema);
}
