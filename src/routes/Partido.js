const { Router } = require('express');
const router = Router();
const PartidoController = require("../controllers/PartidoController")

router.post('/historic-evolution', PartidoController.getHistoryByVariable);


module.exports = router