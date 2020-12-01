const {checkSchema} = require('express-validator');

module.exports = {
    signup: checkSchema({
        name:{
            trim: true,
            isLength:{
                options:{
                    min:2
                }
            },
            errorMessage:'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail:true,
            normalizeEmail:true,
            notEmpty:true,
            errorMessage:'Email inválido'
        },
        password:{
            trim: true,
            isLength:{
                options:{
                    min:8
                }
            },
            errorMessage:'Senha precisa ter pelo menos 8 caracteres'
        }

    })
}