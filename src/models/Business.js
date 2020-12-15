const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const BusinessSchema = new mongoose.Schema({
    id: String,
    name:String,
});

const modelName = 'Business';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, BusinessSchema);
}