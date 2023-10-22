const { Router } = require('express');
const router = Router();
const EleicaoConstroller = require("../controllers/EleicaoController")

router.get('/', EleicaoConstroller.getAll);

module.exports = router