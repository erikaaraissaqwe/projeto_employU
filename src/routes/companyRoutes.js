const router = require("express").Router();
const companyController = require("../controllers/CompanyController");
router.get("/login", (req, res)=>{
    res.send("login formulario")
});

router.post("/login", (req, res)=>{
    //todo: login verification
});

router.get("/signup", (req, res)=>{
    res.send("cadastro formulario")
});

router.post("/register", companyController.register);

router.post("/logout", (req, res)=>{
    //todo: logout verification
});

router.use("/vagas", require("./companyJobRoutes"));

module.exports = router;