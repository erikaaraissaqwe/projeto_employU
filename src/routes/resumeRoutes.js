const router = require("express").Router();
const multer = require('multer');
const uploadConfig = require('../config/upload');
const curriculumController = require("../controllers/CurriculumController");
const upload = multer(uploadConfig);

router.get("/novo", (req, res)=>{
    res.send("curriculo formulario")
});


/*
COMO USAR A ROTA ABAIXO?
usando o multipart, você acessa a rota
'http://localhost:3333/candidato/curriculo/send' e coloca
o: address, professionalExperiences(sendo que esse cria array, a string deve ser separado por virgula), 
academicFormations(sendo que esse cria array, a string deve ser separado por virgula), e se quiser uma foto manda o filename. 
No Header tem que mandar o id_user, já cadastrado e assim consegue salvar o curriculo  
*/

//salva dados do curriculo do candidato
router.post("/send", upload.single('filename'), curriculumController.store);

module.exports = router;