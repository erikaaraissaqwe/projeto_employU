const router = require("express").Router();
const jobController = require("../controllers/CandidateJobController");

router.get("/", jobController.listAllOpen);

router.get("/:vagaId", jobController.listOne);

router.post("/:vagaid/candidatar", (req, res)=>{
    //todo: candidatar a vaga verificacao
});

router.post("/:vagaId/desistir", (req, res)=>{
    //todo: cancelar candidatura a vaga verificacao + feedback
});

module.exports = router;