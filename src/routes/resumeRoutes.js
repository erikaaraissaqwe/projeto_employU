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

router.post("/send", upload.single('fileProfile'), curriculumController.store);

module.exports = router;