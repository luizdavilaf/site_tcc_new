const { Router } = require('express');
const router = Router();
const candidatoEleicaoController = require("../controllers/CandidatoEleicaoController")


router.get('/result-year', candidatoEleicaoController.getFormData);

router.post('/compare-elections', candidatoEleicaoController.getFormDataForCompare);

router.post('/historic-evolution', candidatoEleicaoController.getFormDataForHistoricEvolution);

module.exports = router