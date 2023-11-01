
const moment = require("moment");
const PartidoService = require("../services/PartidoService");
const CandidatoEleicaoService = require("../services/CandidatoEleicaoService")
const EleicaoService = require("../services/EleicaoService")
const utils = require("../utils/utils")


const getHistoryByVariable = async (req, res) => {
    try {
        let turno
        let abrangencia
        if (!req.body.variavel) {
            throw new Error("Variável deve ser selecionada")
        }
        if (!req.body.partido) {
            throw new Error("Todos os campos devem ser preenchidos")
        }
        
        if (req.body.only_first_turn && req.body.only_first_turn == "true") {
            turno = 1
        }
        if (req.body.abrangencia && req.body.abrangencia != "") {
            abrangencia = req.body.abrangencia
        }
        console.log(req.body.abrangencia)
        const eleicoes = await EleicaoService.findAll(turno, abrangencia)
        let regiao = ""
        const partido = await PartidoService.findById(req.body.partido)
        
        const promises = []

        let tituloVariavel = ""
        if (req.body.variavel == "genero") {
            tituloVariavel = "Gênero"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByGender(parseInt(req.body.partido), parseInt(eleicao.id)))
            }

        } else if (req.body.variavel == "idade") {
            tituloVariavel = "Idade"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByAge(parseInt(req.body.partido), parseInt(eleicao.id)))
            }
        } else if (req.body.variavel == "ocupacao") {
            tituloVariavel = "Ocupação"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByOcupation(parseInt(req.body.partido), parseInt(eleicao.id)))
            }
        } else if (req.body.variavel == "grau_instrucao") {
            tituloVariavel = "Grau de Instrução"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByDegree(parseInt(req.body.partido), parseInt(eleicao.id)))
            }
        } else if (req.body.variavel == "reeleito") {
            tituloVariavel = "Reeleição"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoReelection(parseInt(req.body.partido), parseInt(eleicao.id)))
            }
        } else if (req.body.variavel == "raca") {
            tituloVariavel = "Raça"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(PartidoService.getPartidoEleicaoByRace(parseInt(req.body.partido), parseInt(eleicao.id)))
            }
        }

        const setLabels = new Set()
        const setVariaveis = new Set()

        const data = await Promise.all(promises)
        //console.log(data)
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
                borderColor: utils.generateSequentialColors(index),
                minBarLength: 15,
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
        console.log(error)
        res.render('error.ejs');
        //return res.json({success: false, message: error.message, data: []})

    }
}


module.exports = {
    getHistoryByVariable,
    
}
