const router = require("express").Router();
const jobController = require("../controllers/CompanyJobController");


router.post("/add", jobController.validateNewJob, jobController.add);

router.get("/:vagaid", jobController.listOne);

router.put("/:vagaid", jobController.closeJob );//falta feedback

router.get("/:vagaId/candidato/:candidatoNome", (req, res)=>{
    res.send("perfil e curriculo do candidato concorrente a vaga");
});

router.post("/:vagaId/candidato/:candidatoNome", (req, res)=>{
    //todo: eliminar candidato + feedback
});

module.exports = router;