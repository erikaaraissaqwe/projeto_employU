const router = require("express").Router();

router.get("/login", (req, res)=>{
    res.send("login formulario")
});

router.post("/login", (req, res)=>{
    //todo: login verification
});

router.get("/signup", (req, res)=>{
    res.send("cadastro formulario")
});

router.post("/signup", (req, res)=>{
    //todo: signup verification
});

router.post("/logout", (req, res)=>{
    //todo: logout verification
});

router.use("/vagas", require("./jobRoutes"));

module.exports = router;