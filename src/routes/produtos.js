const { Router } = require('express')
const router = Router();

const produtosModel = require('../models/produtosModel')

router.get('/', async (req, res) => {
    return res.render('produtos');
});
router.get('/read', async (req, res) => {
    try {
        const result = await produtosModel.query('select * from produtos;')
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }

        return res.status(500).send(error)
    }
})
router.get('/read/:id',async(req, res)=>{
    try{
        const id = req.params.id
        const result = await produtosModel.query(`select * from produtos where idProduto = ${id}`)
        console.log('resutado desse caraio',result)
    } catch (error){
        return res.status(400).send(error)
    }
})
router.post('/save', async(req, res)=>{
    try{
        const nome = req.body.nome
        const valor = req.body.valor
        console.log('nSAVE', nome, valor)
        const result = await produtosModel.query({
            sql: `INSERT INTO produtos(nome,valor) VALUES ('${nome}','${valor}')`,
        })
        return res.status(200).json({
            id:result.insertId
        })
    } catch (error) {
        console.log(error)
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }
        return res.status(500).send(error)
    }
})

router.put('/editar', async(req, res)=>{
    try {
        const id = req.body.id
        const nome = req.body.nome
        const valor = req.body.valor
        console.log(id, nome, valor)
        const result = await produtosModel.query(`UPDATE produtos SET nome='${nome}', valor=${valor} WHERE idProduto=${id}`)
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }

        return res.status(500).send(error)
    }
})
router.delete('/excluir/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const result = await produtosModel.query(`DELETE FROM produtos where idProduto='${id}'`)
        console.log("result",result)
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }

        return res.status(500).send(error)
    }
})

module.exports = router;