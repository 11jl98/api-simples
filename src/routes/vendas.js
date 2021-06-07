const { Router } = require('express')
const router = Router();

const vendasModel = require('../models/vendasModel')

router.get('/', async (req, res) => {
    const clientes = await vendasModel.query('select idCliente, nome from cliente')
    const produtos = await vendasModel.query('select idProduto, nome from produtos')
    return res.render('vendas', {
        cliente: clientes,
        produtos: produtos
    });
});

router.get('/read', async (req, res) => {
    try {
        const result = await vendasModel.querry('select * from venda')
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }
        return res.status(500).send(error)
    }
})
router.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await vendasModel.query(`select* from venda where idVenda = ${id}`)
        return res.status(200).json(result)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/save', async (req, res) => {
    try {
        const idCliente = req.body.idCliente
        const valor = req.body.valor
        const dadosAdicionais = req.body.dadosAdicional
        console.log(idCliente, valor, dadosAdicionais)

        const result = await vendasModel.query(`insert into venda(idCliente, valor, dadosAdicional) values(${idCliente},${valor},'${dadosAdicionais}')`)
        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.put('/editar', async (req, res) => {
    try {
        const id = req.body.id
        const idVenda = req.body.idVenda
        const idCliente = req.body.idCliente
        const valor = req.body.valor
        const dadosAdicionais = req.body.dadosAdicionais
        console.log(id, nome, valor)
        const result = await vendasModel.query(`UPDATE venda SET idVenda=${idVenda}, idCliente=${idCliente}, valor=${valor} dadosAdicionais=${dadosAdicionais} WHERE idProduto=${id}`)
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
        const result = await vendasModel.query(`DELETE FROM venda where idVenda='${id}'`)
    } catch (error) {

    }
})

// DADOS DO PRODUTO_PEDIDO










module.exports = router
