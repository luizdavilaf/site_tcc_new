const CandidatoEleicaoService = require("../services/CandidatoEleicaoService")

const getFormData = async (req, res) => {
    //eleicao=1&abrangencia=FEDERAL&regiao=8&situacao-turno=2&cargo=1
    try {
        console.log(req.query)
        if (!req.query.eleicao) {
            throw new Error("Eleiçao deve ser selecionada")
        }
        if (!req.query.abrangencia) {
            throw new Error("Abrangencia deve ser selecionada")
        }
        if (!req.query.regiao) {
            throw new Error("regiao deve ser selecionada")
        }
        if (!req.query.situacao_turno) {
            throw new Error("situacao_turno deve ser selecionada")
        }
        if (!req.query.cargo) {
            throw new Error("cargo deve ser selecionado")
        }
        const response = await Promise.all([
            CandidatoEleicaoService.getCandidatoEleicaoByDegree(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByGender(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByAge(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByOcupation(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByParty(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByRace(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoReelection(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),

        ])


        console.log(response)

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getFormData
}