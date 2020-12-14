require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload =require('express-fileupload');
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

server.use(express.static(__dirname+'/public'));

server.get("/", (req, res)=>{
    res.redirect("/inicio")
});

server.get("/inicio", (req, res)=>{
    res.send("Home com login/cadastro")
});

//routes to candidateRoutes
server.use("/candidato", require("./src/routes/candidateRoutes.js"));

//routes to companyRoutes
server.use("/empresa", require("./src/routes/companyRoutes.js"));

server.get('/ping', (req, res)=>{
    res.json({pong:true});
});

server.get("*", (req, res)=>{
    res.send("404")
});

server.listen(process.env.PORT, ()=>{
    console.log(`- Rodando no endereço: ${process.env.BASE}`);
});