
const EleicaoService = require("../services/EleicaoService")
const UnidadeEleitoralService = require("../services/UnidadeEleitoralService")
const SituacaoTurnoService = require("../services/SituacaoTurnoService")
const CargoService = require("../services/CargoService")

const renderResultsYearForm = async (req, res) => {
    try {
        const eleicoes = await EleicaoService.findAll()
        const abrangencias = await UnidadeEleitoralService.findAllAbrangencies()
        const situacoes_turno = await SituacaoTurnoService.findAll()
        const cargos = await CargoService.findAll()
        return res.render("form-results-year", { eleicoes, abrangencias, situacoes_turno, cargos })
    } catch (error) {
        console.log(error)
        return res.render("error", { message: "Erro ao renderizar página de resultados por eleiçao."})
    }
}


module.exports = {
    renderResultsYearForm
}