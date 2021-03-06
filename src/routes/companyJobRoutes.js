const router = require("express").Router();
const jobController = require("../controllers/CompanyJobController");

router.post("/add", jobController.validateNewJob, jobController.add);

//lista as vagas abertas
router.get("/", jobController.listAllOpen);

//lista as vagas fechadas
router.get("/fechadas", jobController.listAllClosed);

//lista uma vaga
router.get("/:vagaId", jobController.listOne);

//fecha uma vaga
router.put("/:vagaId", jobController.closeJob );

//retorna dados dos candidatos de uma vaga
router.get("/:vagaId/candidatos", jobController.listCandidates);

//busca informação de um candidato que está em uma vaga
router.get("/:vagaId/candidatos/:candidatoId", jobController.candidateInfo);

//feedback
router.put("/:vagaId/feedback", jobController.feedback);



module.exports = router;