const router = require("express").Router();
const candidateController = require("../controllers/CandidateController");
const authMiddleware = require('../middlewares/Auth');


router.post("/loginCheck", candidateController.login);

router.post("/register", candidateController.register);


router.use("/curriculo", require("./resumeRoutes"));

router.use("/vagas", require("./jobRoutes"));

module.exports = router;