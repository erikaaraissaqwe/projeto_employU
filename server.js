require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));



mongoose.connect('mongodb+srv://employU:employU@employu.p4q3n.mongodb.net/<employU>?retryWrites=true&w=majority',
{
    userNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
);



server.use(express.static(__dirname+'/public'));

server.get("/", (req, res)=>{
    res.redirect("/inicio")
});

server.get("/inicio", (req, res)=>{
    res.send("Home com login/cadastro")
});

//routes to applicantRoutes
server.use("/candidato", require("./src/routes/applicantRoutes.js"));

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