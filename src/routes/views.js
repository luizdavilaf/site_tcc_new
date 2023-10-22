const { Router } = require('express');
const router = Router();
const viewsController = require("../controllers/views")

router.get("/results-year", viewsController.renderResultsYearForm)

router.get("/compare-regions", viewsController.renderResultsYearFormForCompare)

router.get("/search-candidates-form", viewsController.renderSearchCandidates)

module.exports = router