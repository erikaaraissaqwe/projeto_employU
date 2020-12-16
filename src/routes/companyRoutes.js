const router = require("express").Router();
const companyController = require("../controllers/CompanyController");
const authMiddleware = require('../middlewares/Auth')

router.post("/loginCheck", companyController.login);

router.post("/register", companyController.register);

//router.use(authMiddleware);

router.post("/logout", (req, res)=>{
    //todo: logout verification
});

router.use("/vagas", authMiddleware.private, require("./companyJobRoutes"));

module.exports = router;