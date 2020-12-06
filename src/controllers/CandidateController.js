const candidate = require("../models/Candidate");

module.exports = {

    async register(req, res){
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const cpf = req.body.cpf;

        const user = await candidate.create({name, email, password, cpf});

        return res.json({user});
    },
    



}