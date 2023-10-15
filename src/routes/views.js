const { Router } = require('express');
const router = Router();
const viewsController = require("../controllers/views")

router.get("/results-year", viewsController.renderResultsYearForm)

module.exports = router