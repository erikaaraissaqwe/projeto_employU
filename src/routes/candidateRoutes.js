const router = require("express").Router();
const candidateController = require("../controllers/CandidateController");
const authMiddleware = require('../middlewares/Auth')


router.post("/loginCheck", candidateController.login);

router.post("/register", candidateController.register);

router.use("/curriculo", authMiddleware.privateCandidate, require("./resumeRoutes"));

router.use("/vagas", authMiddleware.privateCandidate, require("./candidateJobRoutes"));

module.exports = router;