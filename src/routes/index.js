const { Router } = require('express');
const router = Router();

const views = require('../routes/views');
router.use('/views', views);

const unidadeEleitoral = require('../routes/UnidadeEleitoral');
router.use('/unidade-eleitoral', unidadeEleitoral);

const CandidatoEleicao = require('../routes/CandidatoEleicao');
router.use('/candidate-election', CandidatoEleicao);

const Candidato = require('../routes/Candidato');
router.use('/candidate', Candidato);


module.exports = router