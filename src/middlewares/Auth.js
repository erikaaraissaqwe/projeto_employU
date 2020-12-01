const Company = require("../models/Company");
const Candidate = require("../models/Candidate");

module.exports = {
    private: async (req, res, next) =>{
        if(!req.query.token && !req.body.token){
            res.json({notallowed: true});
            return;
        }

        let token = '';

        if(req.query.token){
            token = req.query.token;
        }

        if(req.body.token){
            token = req.body.token;
        }
        if(token === ''){
            res.json({notallowed: true});
            return;
        }

        let user;
        switch(type){
            case 'company':
            user = await Company.findOne({token});
            break;

            case 'candidate':
                user = await Candidate.findOne({token});
                break;
        }

        if(!user){
            res.json({notallowed: true});
            return;
        }

        next();
    }
} 