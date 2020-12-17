const router = require("express").Router();
const jobController = require("../controllers/CandidateJobController");

router.get("/", jobController.listAllOpen);

router.get("/:vagaId", jobController.listOne);

router.post("/:vagaid/candidatar", jobController.applyForJob);

router.put("/:vagaId/desistir", jobController.cancelApplication);

module.exports = router;