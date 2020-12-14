const router = require("express").Router();
const companyController = require("../controllers/CompanyController");

router.post("/loginCheck", companyController.login);

router.post("/register", companyController.register);

router.use("/vagas", require("./jobRoutes"));

module.exports = router;