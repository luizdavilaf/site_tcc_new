
const UnidadeEleitoralService = require("../services/UnidadeEleitoralService")

const getUnitiesByAbrangency = async (req, res) => {
    try {
        const abrangency = req.params.abrangency
        const unidades_eleitorais = await UnidadeEleitoralService.findUnitiesByAbrangengy(abrangency)
        return res.json({ success: true, data: unidades_eleitorais })
    } catch (error) {
        res.status(500).render('error.ejs');
        //return res.json({ success: false, message: error.message })

    }
}

module.exports = {
    getUnitiesByAbrangency
}