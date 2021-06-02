const { Router } = require('express')
const router = Router();
const modelCliente = require('../models/clienteModel')


router.get('/', async (req, res) => {
    return res.render('cliente');
});

router.get('/read', async (req, res) => {
    try {
       
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send(error)
        }

        return res.status(500).send(error)
    }
})

router.post('/save', async (req, res) => {
    try {
        const nome = req.body.nome
        const sobreNome = req.body.sobreNome
        console.log(nome, sobreNome)
        const result = await modelCliente.query({
            sql: `INSERT INTO cliente(nome,sobreNome) VALUES ('${nome}','${sobreNome}')`,
        })
        console.log()
        return res.status(200).json({
            id:result.insertId
        })
    } catch (error) {
        console.log(error)
        if (error.errno === 1064) {
            return res.status(400).send("erro na sa sintax")
        }
        return res.status(500).send(error)
    }
})
router.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log("id para ler",id)
        const result = await modelCliente.query(`select * from cliente where idCliente = ${id} limit 1`)
        console.log("result", result)
        return res.status(200).json(result)
    } catch (error) {
        if (error.errno === 1064) {
            return res.status(400).send("erro na sa sintax")
        }

        return res.status(500).send(error)
    }
})

router.put('/editar', async (req, res) => {
    try {
        const id = req.body.id
        const nome = req.body.nome
        const sobreNome = req.body.sobreNome
        console.log(id, nome, sobreNome)
        const result = await modelCliente.query(`UPDATE cliente SET nome='${nome}', sobreNome='${sobreNome}' WHERE idCliente='${id}'`)
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
        const result = await modelCliente.query(`DELETE FROM cliente where idCliente='${id}'`)
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