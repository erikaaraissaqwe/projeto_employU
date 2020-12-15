const router = require("express").Router();
const candidateController = require("../controllers/CandidateController");

router.get("/login", (req, res)=>{
    res.send("login formulario")
});

router.post("/loginCheck", (req, res)=>{
    //todo: login verificacao
});

router.get("/signup",  (req, res)=>{
    res.send("cadastro formulario")
});

router.post("/register", candidateController.register);

router.post("/logout", (req, res)=>{
    //todo: logout verificacao
});

router.use("/curriculo", require("./resumeRoutes"));

router.use("/vagas", require("./candidateJobRoutes"));

module.exports = router;