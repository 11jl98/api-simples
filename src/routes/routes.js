const { Router } = require('express')
const ClienteRoute = require('./cliente')
const ProdutosRoute = require('./produtos')
const VendaRoute = require('./vendas')
const router = Router()

router.use('/cliente', ClienteRoute)
router.use('/produtos', ProdutosRoute)
router.use('/vendas', VendaRoute)


module.exports = router;