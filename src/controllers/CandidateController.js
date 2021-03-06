const Candidate = require("../models/Candidate");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    async register(req, res){
        try{
            const {name} = req.body;
            const {email} = req.body;
            const {password} = req.body;
            const {cpf} = req.body;
    
            let user = await Candidate.findOne({email});

            if (!user){

                user = await Candidate.create({
                    name,
                    email,
                    password,
                    cpf
                });

                user.password = undefined;
                return res.send({user, token: generateToken({id: user.id})});
            }
    
            return res.status(400).json({errorMessage:'User already exists'});
        }
        catch(err){
        
            return res.status(500).json({errorMessage:'Registration failed'});
        }
    },

    async login(req, res){
        const {email} = req.body;
        const {password} = req.body;

        const user = await Candidate.findOne({email}).select('+password');

        if (!user){
            return res.status(400).json({errorMessage:'User not found'});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({errorMessage:'Invalid password'});
        }

        user.password = undefined;

    
        return res.json({user, 
            token : generateToken({id : user.id}),
        });
    }
}

function generateToken(params = {}){
    return jwt.sign({params}, authConfig.secret,{
        expiresIn : 10286,
    });
}

