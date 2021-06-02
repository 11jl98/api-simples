const { Router } = require('express')
const router = Router();

const produtosModel = require('../models/produtosModel')

router.get('/', async (req, res) => {
    return res.render('produtos');
});
router.get('/read', async (req, res) => {
    try {
        const result = await produtosModel.query('select * from cliente;')
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }

        return res.status(500).send(error)
    }
})
router.get('/read/:id',async(req, res)=>{
    
})