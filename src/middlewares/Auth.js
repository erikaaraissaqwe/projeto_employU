const Company = require("../models/Company");
const Candidate = require("../models/Candidate");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    private : async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({errorMessage:'No token provided'});
        }

        const parts = authHeader.split(' ');

        if(!parts.length === 2){
            return res.status(401).send({errorMessage:'Token error'});
        }

        const [scheme, token] = parts;
        if(!/^Bearer$/i.test(scheme)){
            return res.status(401).send({errorMessage:'Token malformatted'});
        }

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err){
                return res.status(401).send({errorMessage:'Token invalid'});
            }
            req.userId = decoded.params.id;
            return next();
        });
        
    } 
}