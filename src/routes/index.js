const { Router } = require('express');
const router = Router();

const views = require('../routes/views');
router.use('/views', views);

const unidadeEleitoral = require('../routes/UnidadeEleitoral');
router.use('/unidade-eleitoral', unidadeEleitoral);

const CandidatoEleicao = require('../routes/CandidatoEleicao');
router.use('/candidate-election', CandidatoEleicao);


module.exports = router