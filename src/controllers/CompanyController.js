const Company = require("../models/Company");

module.exports = {

    async register(req, res){
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const cnpj = req.body.cnpj;

        let user = await Company.findOne({email});
        if (!user){
            user = await Company.create({name, email, password, cnpj});
            return res.json({user});
        }

        return res.json({errorMessage:'Empresa já cadastrado'});
        
    },

    async login(req, res){
        const { email } = req.body;
        const { password } = req.body;
        const user = await user.findOne({email});
        return res.json({user});
    }
}
