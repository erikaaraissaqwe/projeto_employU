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


module.exports = mongoose.model(modelName, CurriculumSchema);