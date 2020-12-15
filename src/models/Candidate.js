const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const CandidateSchema = new mongoose.Schema({
    name:String,
    email: {
        type : String,
        unique : true,
        lowercase : true,
        require : true,
    },
    password : {
        type: String,
        select: false,
    },
    cpf: String
});

const modelName = 'Candidate';

CandidateSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});


module.exports = mongoose.model(modelName, CandidateSchema);