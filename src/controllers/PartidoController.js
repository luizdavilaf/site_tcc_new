
const moment = require("moment");
const PartidoService = require("../services/PartidoService");
const CandidatoEleicaoService = require("../services/CandidatoEleicaoService")
const EleicaoService = require("../services/EleicaoService")
const utils = require("../utils/utils")


const getHistoryByVariable = async (req, res) => {
    try {
        if (!req.body.variavel) {
            throw new Error("Variável deve ser selecionada")
        }
        if (!req.body.partido) {
            throw new Error("Todos os campos devem ser preenchidos")
        }
        const eleicoes = await EleicaoService.findAll()
        let regiao = ""
        const partido = await PartidoService.findById(req.body.partido)

        const promises = []

        let tituloVariavel = ""
        if (req.body.variavel == "genero") {
            tituloVariavel = "Gênero"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByGender(parseInt(req.body.partido),  parseInt(eleicao.id)))
            }

        } else if (req.body.variavel == "idade") {
            tituloVariavel = "Idade"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByAge(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        } else if (req.body.variavel == "partido") {
            tituloVariavel = "Partido"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByParty(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        } else if (req.body.variavel == "ocupacao") {
            tituloVariavel = "Ocupação"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByOcupation(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        } else if (req.body.variavel == "grau_instrucao") {
            tituloVariavel = "Grau de Instrução"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByDegree(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        } else if (req.body.variavel == "reeleicao") {
            tituloVariavel = "Reeleição"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoReelection(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        } else if (req.body.variavel == "raca") {
            tituloVariavel = "Raça"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByRace(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            }
        }

        const setLabels = new Set()
        const setVariaveis = new Set()

        const data = await Promise.all(promises)
        const filteredElections = data.filter(sub => sub.length > 0) //cada posicao é uma eleicao        
        for (let i = 0; i < filteredElections.length; i++) {
            const eleicao = filteredElections[i];
            for (let j = 0; j < eleicao.length; j++) {
                const resultado = eleicao[j];
                setLabels.add(`${resultado.anoEleicao} - ${resultado.turno}Turno`)
                setVariaveis.add(resultado[req.body.variavel])
            }
        }
        

        const arrayDeVariaveis = [...setVariaveis]
        const labels = [...setLabels]
        const chartData = {
            labels: labels,
            datasets: [],
        };

        arrayDeVariaveis.forEach((variavel, index) => {
            const dataset = {
                label: variavel, // Use o gênero como label
                data: [], // Array de dados para o gênero
                backgroundColor: utils.generateSequentialColors(index),
                borderColor: utils.generateSequentialColors(index)
            };


            // Percorra os anos
            filteredElections.forEach((eleicao) => {
                // Procure o valor correspondente no array de dados do ano/gênero
                const valor = eleicao.find((item) => item[req.body.variavel] === variavel);

                // Se encontrou, use o valor totalCandidatos, caso contrário, use 0
                dataset.data.push(valor ? valor.totalCandidatos : 0);
            });

            // Adicione o dataset ao objeto de dados final
            chartData.datasets.push(dataset);
        });

        res.render('party-historic-evolution-result.ejs', { chartData, tituloVariavel, partido });
        
        
    } catch (error) {
        return res.json({success: false, message: error.message, data: []})

    }
}


module.exports = {
    getHistoryByVariable,
    
}
