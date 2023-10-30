const { Router } = require('express');
const router = Router();
const viewsController = require("../controllers/views")

router.get("/results-year", viewsController.renderResultsYearForm)

router.get("/compare-regions", viewsController.renderResultsYearFormForCompare)

router.get("/search-candidates-form", viewsController.renderSearchCandidates)

router.get("/historic-evolution-form", viewsController.renderHistoricEvolution)

router.get("/party-historic-evolution-form", viewsController.renderPartyHistoricEvolution)

router.get("/dashboard", viewsController.renderDashboard)

router.get("/submit-opinion", viewsController.renderOpinions)

module.exports = router