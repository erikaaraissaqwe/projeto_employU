
const authMiddleware = require('../middlewares/Auth');


module.exports = {

    checkCandidate : async (req, res) => {
        console.log(authMiddleware.privateCandidate());
        if(authMiddleware.privateCandidate){
            return res.status(200).send({message:'CERTO', data: 200});
        }else{
            return res.status(401).send({errorMessage:'Headers Undefined', data: 401});
        }  
    },

    checkCompany : async (req, res) => {

        if(authMiddleware.privateCompany){
            res.send({data:"200"});
        }else{
            res.send({data:"401"});
        }  
    }
}
