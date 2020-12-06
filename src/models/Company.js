const mongoose = require('mongoose');
const Business = require('./Business');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    id: String,
    name:String,
    email: String,
    password:String,
    cnpj: String
});

const modelName = 'Company';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}
