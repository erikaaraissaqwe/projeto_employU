const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("visualizar curriculo")
});

router.get("/novo", (req, res)=>{
    res.send("curriculo formulario")
});

router.post("/send", (req, res)=>{
    //todo: curriculo verificacao
});

module.exports = router;