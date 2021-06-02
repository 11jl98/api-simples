const { Router } = require('express')
const router = Router();

const produtosModel = require('../models/produtosModel')

router.get('/', async (req, res) => {
    return res.render('produtos');
});
 router.get('/', async(req, res)=>{
     
 })