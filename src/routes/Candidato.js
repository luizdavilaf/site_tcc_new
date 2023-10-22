const { Router } = require('express');
const router = Router();
const CandidatoController = require("../controllers/CandidatoController")

router.post('/search', CandidatoController.getByName);

router.get('/search', CandidatoController.getById);

module.exports = router