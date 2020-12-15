const router = require("express").Router();
const multer = require('multer');
const uploadConfig = require('../config/upload');
const curriculumController = require("../controllers/CurriculumController");
const upload = multer(uploadConfig);

router.get("/", (req, res)=>{
    res.send("visualizar curriculo")
});

router.get("/novo", (req, res)=>{
    res.send("curriculo formulario")
});

//salva dados do curriculo
router.post("/send", upload.array('filesCandidate'), curriculumController.store);

module.exports = router;