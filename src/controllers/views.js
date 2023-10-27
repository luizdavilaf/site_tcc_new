
const EleicaoService = require("../services/EleicaoService")
const UnidadeEleitoralService = require("../services/UnidadeEleitoralService")
const SituacaoTurnoService = require("../services/SituacaoTurnoService")
const CargoService = require("../services/CargoService")
const PartidoService = require("../services/PartidoService")
const CandidatoService = require("../services/CandidatoService")

const renderResultsYearForm = async (req, res) => {
    try {
        const eleicoes = await EleicaoService.findAll()
        const abrangencias = await UnidadeEleitoralService.findAllAbrangencies()
        const situacoes_turno = await SituacaoTurnoService.findAll()
        const cargos = await CargoService.findAll()
        return res.render("results-year-form", { eleicoes, abrangencias, situacoes_turno, cargos })
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}


const renderResultsYearFormForCompare = async (req, res) => {
    try {
        const eleicoes = await EleicaoService.findAll()
        const abrangencias = await UnidadeEleitoralService.findAllAbrangencies()
        const situacoes_turno = await SituacaoTurnoService.findAll()
        const cargos = await CargoService.findAll()
        return res.render("compare-regions-form", { eleicoes, abrangencias, situacoes_turno, cargos })
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

const renderSearchCandidates = async (req, res) => {
    try {        
        return res.render("search-candidates-form")
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

const renderHistoricEvolution = async (req,res) =>{
    try {       
        const abrangencias = await UnidadeEleitoralService.findAllAbrangencies()
        const situacoes_turno = await SituacaoTurnoService.findAll()
        const cargos = await CargoService.findAll()
        return res.render("historic-evolution-form", {  abrangencias, situacoes_turno, cargos })        
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

const renderPartyHistoricEvolution = async (req, res) => {
    try {
        
        const partidos = await PartidoService.findAll()       
        return res.render("party-historic-evolution-form", { partidos })
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

const renderDashboard = async (req, res) => {
    try {
        const promises = [CandidatoService.countAll(), await EleicaoService.countAll(), PartidoService.countAll()]
        const result = await Promise.all(promises)
        
        return res.render("dashboard", { candidatos: Number(result[0]).toLocaleString(), eleicoes: result[1].length, partidos: result[2],  })
    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

module.exports = {
    renderDashboard,
    renderPartyHistoricEvolution,
    renderHistoricEvolution,
    renderSearchCandidates,
    renderResultsYearForm,
    renderResultsYearFormForCompare
}