const { Router } = require('express');
const router = Router();
const UnidadeEleitoralController = require("../controllers/UnidadeEleitoralController")

router.get('/:abrangency', UnidadeEleitoralController.getUnitiesByAbrangency);

module.exports = router