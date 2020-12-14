const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

const CompanySchema = new mongoose.Schema({
    name : String,
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
    cnpj : String
});

const modelName = 'Company';

CompanySchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

module.exports = mongoose.model(modelName, CompanySchema);