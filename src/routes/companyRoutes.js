const router = require("express").Router();
const companyController = require("../controllers/CompanyController");

router.post("/loginCheck", companyController.login);

router.post("/register", companyController.register);

router.post("/logout", (req, res)=>{
    //todo: logout verification
});

router.use("/vagas", require("./companyJobRoutes"));


module.exports = router;