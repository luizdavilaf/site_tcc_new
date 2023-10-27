const CandidatoEleicaoService = require("../services/CandidatoEleicaoService")
const EleicaoService = require("../services/EleicaoService")
const utils = require("../utils/utils")

const getFormData = async (req, res) => {
    //eleicao=1&abrangencia=FEDERAL&regiao=8&situacao-turno=2&cargo=1
    try {
        //console.log(req.query)
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

        const dataGeral = {
            eleicao: `Eleição de ${data[0][0].anoEleicao} - ${data[0][0].turno} Turno`,
            regiao: `${data[0][0].estado} - ${data[0][0].nome}`,
        }

        const chartData = [
            {
                id: "graudeinstrucao",
                categoria: "Grau de Instrução",
                labels: data[0].map((item) => item.grau_instrucao),
                data: data[0].map(item => item.totalCandidatos),
            },
            {
                id: "genero",
                categoria: "Gênero",
                labels: data[1].map(item => item.genero),
                data: data[1].map(item => item.totalCandidatos),
            },
            {
                id: "idade",
                categoria: "Idade",
                labels: data[2].map(item => item.idade),
                data: data[2].map(item => item.totalCandidatos),
            },
            {
                id: "ocupacao",
                categoria: "Ocupação",
                labels: data[3].map(item => item.ocupacao),
                data: data[3].map(item => item.totalCandidatos),
            },
            {
                id: "partido",
                categoria: "Partido",
                labels: data[4].map(item => item.partido),
                data: data[4].map(item => item.totalCandidatos),
            },
            {
                id: "raca",
                categoria: "Raça",
                labels: data[5].map(item => item.raca),
                data: data[5].map(item => item.totalCandidatos),
            },
            {
                id: "reeleito",
                categoria: "Reeleito",
                labels: data[6].map(item => item.reeleito),
                data: data[6].map(item => item.totalCandidatos),
            }
        ]
        //console.log(chartData[1])
        //console.log(dataGeral)
        //console.log({ grau_de_instrucao: JSON.stringify(grau_de_instrucao), genero: JSON.stringify(genero), idade, ocupacao, partido, raca })

        res.render('results-year-charts.ejs', { chartData, dataGeral });

    } catch (error) {
        //console.log(error)
        res.render('error.ejs');
    }
}


const getFormDataForCompare = async (req, res) => {

    try {
        console.log(req.body)
        if (!req.body.variavel) {
            throw new Error("Variável deve ser selecionada")
        }
        if (!req.body.eleicao1.eleicao || !req.body.eleicao1.abrangencia || !req.body.eleicao1.regiao || !req.body.eleicao1.situacao_turno || !req.body.eleicao1.cargo
            || !req.body.eleicao2.eleicao || !req.body.eleicao2.abrangencia || !req.body.eleicao2.regiao || !req.body.eleicao2.situacao_turno || !req.body.eleicao2.cargo) {
            throw new Error("Todos os campos devem ser preenchidos")
        }
        const promises = []

        let tituloVariavel = ""
        if (req.body.variavel == "genero") {
            tituloVariavel = "Gênero"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByGender(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByGender(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "idade") {
            tituloVariavel = "Idade"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByAge(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByAge(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "partido") {
            tituloVariavel = "Partido"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByParty(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByParty(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "ocupacao") {
            tituloVariavel = "Ocupação"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByOcupation(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByOcupation(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "grau_instrucao") {
            tituloVariavel = "Grau de Instrução"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByDegree(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByDegree(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "reeleito") {
            tituloVariavel = "Reeleição"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoReelection(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoReelection(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        } else if (req.body.variavel == "raca") {
            tituloVariavel = "Raça"
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByRace(parseInt(req.body.eleicao1.eleicao), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
            promises.push(CandidatoEleicaoService.getCandidatoEleicaoByRace(parseInt(req.body.eleicao2.eleicao), parseInt(req.body.eleicao2.regiao), req.body.eleicao2.situacao_turno, req.body.eleicao2.cargo))
        }

        const data = await Promise.all(promises)   
        //console.log(data)     
        const chartData = data.map(eleicao => object = {
            id: req.body.variavel,
            categoria: tituloVariavel,
            labels: eleicao.map(item => item[req.body.variavel]),
            data: eleicao.map(item => item.totalCandidatos),
            eleicao: `Eleição de ${eleicao[0].anoEleicao} - ${eleicao[0].turno} Turno`,
            regiao: `${eleicao[0].estado} - ${eleicao[0].nome}`,
        })
        //console.log(chartData)
        res.render('compare-regions-charts.ejs', { chartData });



    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}

const getFormDataForHistoricEvolution = async (req, res) => {

    try {
        //console.log(req.body)
        if (!req.body.variavel) {
            throw new Error("Variável deve ser selecionada")
        }
        if (!req.body.eleicao1.abrangencia || !req.body.eleicao1.regiao || !req.body.eleicao1.situacao_turno || !req.body.eleicao1.cargo) {
            throw new Error("Todos os campos devem ser preenchidos")
        }
        const eleicoes = await EleicaoService.findAll()
        let regiao = ""

        const promises = []

        let tituloVariavel = ""
        if (req.body.variavel == "genero") {
            tituloVariavel = "Gênero"
            for (let i = 0; i < eleicoes.length; i++) {
                const eleicao = eleicoes[i];
                promises.push(CandidatoEleicaoService.getCandidatoEleicaoByGender(parseInt(eleicao.id), parseInt(req.body.eleicao1.regiao), req.body.eleicao1.situacao_turno, req.body.eleicao1.cargo))
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
        } else if (req.body.variavel == "reeleito") {
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
        regiao = `${filteredElections[0][0].estado} - ${filteredElections[0][0].nome}`

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

        res.render('historic-evolution-result.ejs', { chartData, tituloVariavel, regiao });



    } catch (error) {
        console.log(error)
        res.render('error.ejs');
    }
}
module.exports = {
    getFormDataForHistoricEvolution,
    getFormData,
    getFormDataForCompare
}