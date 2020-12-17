require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));


mongoose.connect('mongodb+srv://employU:employU@employu.p4q3n.mongodb.net/<employU>?retryWrites=true&w=majority',{
    useUnifiedTopology : true,
    userNewUrlParser : true,
    useCreateIndex : true
});


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