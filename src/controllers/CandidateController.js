const candidate = require("../models/Candidate");

module.exports = {

    async register(req, res){
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const cpf = req.body.cpf;

        let user = await candidate.findOne({email});
        if (!user){
            user = await candidate.create({name, email, password, cpf});
            return res.json({user});
        }

        return res.json({errorMessage:'usuário já cadastrado'});
        

       
    },

    async login(req, res){
        const { email } = req.body;
        const { password } = req.body;
        const user = await user.findOne({email});
        return res.json({user});
    }
}

