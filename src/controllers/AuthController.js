const { validationResult, matchedData} = require('express-validator');
const Company = require("../models/Company");
const Candidate = require("../models/Candidate");


module.exports = {
    signin: async (req, res) => {

    },

    register: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
    
        let data = matchedData(req);
        res.json({correct: true, data});
    }
};