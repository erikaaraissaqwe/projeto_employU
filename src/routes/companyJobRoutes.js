const router = require("express").Router();
const jobController = require("../controllers/CompanyJobController");


router.post("/add", jobController.validateNewJob, jobController.add);

router.get("/:vagaid", jobController.listOne);

router.put("/:vagaid", jobController.closeJob );//falta feedback

router.get("/:vagaId/candidatos", jobController.listCandidates);

router.get("/:vagaId/candidatos/:candidatoId", jobController.candidateInfo);

router.post("/:vagaId/candidatos/:candidatoNome", (req, res)=>{
    //todo: eliminar candidato + feedback
});

module.exports = router;