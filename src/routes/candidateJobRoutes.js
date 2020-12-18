const router = require("express").Router();
const jobController = require("../controllers/CandidateJobController");

//lista vagas em aberto
router.get("/", jobController.listAllOpen);


//lista todas que se candidatou
router.get("/candidatadas", jobController.listAllApplied);

//lista uma vaga
router.get("/:vagaId", jobController.listOne);

//se candidata para uma vaga
router.post("/:vagaid/candidatar", jobController.applyForJob);

//desiste de uma vaga
router.put("/:vagaId/desistir", jobController.cancelApplication);

//feedack
router.put("/:vagaId/feedback", jobController.feedback);

module.exports = router;