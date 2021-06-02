const { Router } = require('express')
const ClienteRoute = require('./cliente')
const router = Router()

router.use('/cliente', ClienteRoute)


module.exports = router;