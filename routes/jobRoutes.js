const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("listagem das vagas");
});

//candidato
router.get("/:empresa/:vagaId", (req, res)=>{
    res.send("visualiza vaga");
});

//candidato
router.get("/:empresa/:vagaid/candidatar", (req, res)=>{
    res.send("Formulario de candidatura a vaga")
});

//candidato
router.post("/:empresa/:vagaid/candidatar", (req, res)=>{
    //todo: candidatar a vaga verificacao
});

//candidato
router.post("/:empresa/:vagaId/desistir", (req, res)=>{
    //todo: cancelar candidatura a vaga verificacao + feedback
});

//empresa
router.get("adicionar", (req, res)=>{
    res.send("cadastra nova vaga");
});

//empresa
router.post("adicionar", (req, res)=>{
    //todo: nova vaga verificacao
});

//empresa
router.get("/:vagaid", (req, res)=>{
    res.send("vaga e lista de candidatos concorrendo");
});

//empresa
router.post("/:vagaid", (req, res)=>{
    //todo: fechar vaga + feedback pra todos
});

//empresa
router.get("/:vagaId/candidato/:candidatoNome", (req, res)=>{
    res.send("perfil e curriculo do candidato concorrente a vaga");
});

//empresa
router.post("/:vagaId/candidato/:candidatoNome", (req, res)=>{
    //todo: eliminar candidato + feedback
});

module.exports = router;