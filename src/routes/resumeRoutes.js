const router = require("express").Router();
const multer = require('multer');
const uploadConfig = require('../config/upload');
const resumeController = require("../controllers/ResumeController");
const upload = multer(uploadConfig);

/*
COMO USAR A ROTA ABAIXO?
usando o multipart, você acessa a rota
'http://localhost:3333/candidato/curriculo/send' e coloca
o: address, professionalExperiences(sendo que esse cria array, a string deve ser separado por virgula), 
academicFormations(sendo que esse cria array, a string deve ser separado por virgula), e se quiser uma foto manda o filename. 
No Header tem que mandar o id_user, já cadastrado e assim consegue salvar o curriculo  
*/

//salva dados do curriculo do candidato
router.post("/send", upload.single('filename'), resumeController.create);

//atualiza dados do curriculo do candidato
router.put("/update", upload.single('filename'), resumeController.edite);

//retorna curriculo
router.get("/list", resumeController.list);

module.exports = router;