require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload =require('express-fileupload');

mongoose.connect(process.env.DATABASE, {
    userNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) =>{
    console.log("ERRO:   ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.get("/", (req, res)=>{
    res.redirect("/inicio")
});
server.get("/inicio", (req, res)=>{
    res.send("Home com login/cadastro")
});
server.use("/candidato", require("./src/routes/applicantRoutes.js"));
server.use("/empresa", require("../routes/companyRoutes.js"));

server.get('/ping', (req, res)=>{
    res.json({pong:true});
});

server.get("*", (req, res)=>{
    res.send("404")
});

server.listen(process.env.PORT, ()=>{
    console.log(`- Rodando no endereço: ${process.env.BASE}`);
});