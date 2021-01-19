const router = require("express").Router();
const jobController = require("../controllers/CompanyJobController");

router.post("/add", jobController.validateNewJob, jobController.add);

//lista as vagas abertas
router.get("/", jobController.listAllOpen);

//lista uma vaga
router.get("/:vagaid", jobController.listOne);

//fecha uma vaga
router.put("/:vagaid", jobController.closeJob );

//retorna dados dos candidatos de uma vaga
router.get("/:vagaId/candidatos", jobController.listCandidates);

//busca informação de um candidato que está em uma vaga
router.get("/:vagaId/candidatos/:candidatoId", jobController.candidateInfo);

//feedack
router.put("/:vagaId/feedback/:candidatoId", jobController.feedback);



module.exports = router;