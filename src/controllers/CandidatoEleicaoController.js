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
        const data = await Promise.all([
            CandidatoEleicaoService.getCandidatoEleicaoByDegree(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByGender(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByAge(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByOcupation(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByParty(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoByRace(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
            CandidatoEleicaoService.getCandidatoEleicaoReelection(parseInt(req.query.eleicao), parseInt(req.query.regiao), req.query.situacao_turno, req.query.cargo),
        ])
        //console.log(data)

/* const labelstext<%= index %> = <%= (category.labels) %> ;
            const labels<%= index %> = labelstext<%= index %>.map(label => unescape(label)); */

        const chartData = [
            {
                id:"graudeinstrucao",
                categoria: "Grau de Instrução",
                labels: data[0].map((item) => item.grau_instrucao),
                data: data[0].map(item => item.totalCandidatos)
            },
            {
                id: "genero",
                categoria: "Gênero",
                labels: data[1].map(item => item.genero),
                data: data[1].map(item => item.totalCandidatos)
            },
            {
                id: "idade",
                categoria: "Idade",
                labels: data[2].map(item => item.idade),
                data: data[2].map(item => item.totalCandidatos)
            },
            {
                id: "ocupacao",
                categoria: "Ocupação",
                labels: data[3].map(item => item.ocupacao),
                data: data[3].map(item => item.totalCandidatos)
            },
            {
                id: "partido",
                categoria: "Partido",
                labels: data[4].map(item => item.partido),
                data: data[4].map(item => item.totalCandidatos)
            },
            {
                id: "raca",
                categoria: "Raça",
                labels: data[5].map(item => item.raca ? item.raca : "Sem dados"),
                data: data[5].map(item => item.totalCandidatos)
            },
            {
                id: "reeleito",
                categoria: "Reeleito",
                labels: data[6].map(item => item.reeleito ? "SIM" : "NAO"),
                data: data[6].map(item => item.totalCandidatos)
            }
        ]
        console.log(data[6])
        //console.log({ grau_de_instrucao: JSON.stringify(grau_de_instrucao), genero: JSON.stringify(genero), idade, ocupacao, partido, raca })

        res.render('results-year-charts.ejs', { chartData });

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getFormData
}