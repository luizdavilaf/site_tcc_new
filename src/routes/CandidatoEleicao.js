const { Router } = require('express');
const router = Router();
const candidatoEleicaoController = require("../controllers/CandidatoEleicaoController")


router.get('/', candidatoEleicaoController.getFormData);

module.exports = router