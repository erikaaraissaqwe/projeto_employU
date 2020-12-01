const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email: String,
    cnpj: String,
    password:{
        type:String,
    }
});
