const express = require('express');
const authMiddleware = require('../middlewares/Auth');

const CheckRouter = express.Router();

CheckRouter.use(authMiddleware);

CheckRouter.get('/',(req,res)=>{
    res.send({ok:true});
});

module.exports = server=>server.use('/check',CheckRouter);