
const moment = require("moment");
const CandidatoService = require("../services/CandidatoService");


const getByName = async (req, res) => {
    try {
        //console.log(req.body.nome)
        if (!req.body.nome || req.body.nome.length < 3){
            throw new Error("Pelo menos 3 letras devem ser enviadas para busca")
        }

        const page = req.body.page || 1; // Página padrão é a primeira página
        const pageSize = req.body.pageSize || 50; // Tamanho da página padrão é 50

        // Calcular o offset com base na página e no tamanho da página
        const offset = (page - 1) * pageSize;

        const candidatos = await CandidatoService.findByName(req.body.nome, pageSize, offset)
        //console.log(candidatos)
        return res.json({ success: true, data: candidatos })
    } catch (error) {
        return res.json({success: false, message: error.message, data: []})

    }
}

const getById = async (req, res) => {
    try {
        //console.log(req.query.candidatoid)
        const data = await CandidatoService.findById(req.query.candidatoid)
        const candidato = {
            nome: data.nome,
            municipio_nascimento: data.municipio_nascimento,
            data_nascimento: moment(data.data_nascimento).format("DD-MM-YYYY"),
            idade: `${moment().diff(moment(data.data_nascimento), 'years')} anos`,
            raca: data.Raca.nome,
            genero: data.Genero.nome_genero,
            local_nascimento: `${data.municipio_nascimento} - ${data.estado_nascimento}`,
            grau_de_instrucao: "a calcular",
            fidelidade_partidaria: "a calcular"

        }  

        const anosDiferentes = new Set();
        const partidosDiferentes = new Set();
        let primeiroAnoParticipacao
        let ultimoAnoParticipacao 
        const eleicoes = data.CandidatoEleicaos.map(eleicao => {
            anosDiferentes.add(eleicao.Eleicao.dataValues.ano_eleicao);
            partidosDiferentes.add(eleicao.Partido.dataValues.sigla)
            if (!primeiroAnoParticipacao || eleicao.Eleicao.dataValues.ano_eleicao < primeiroAnoParticipacao) {
                primeiroAnoParticipacao = eleicao.Eleicao.dataValues.ano_eleicao;
            }
            if (!ultimoAnoParticipacao || eleicao.Eleicao.dataValues.ano_eleicao > ultimoAnoParticipacao) {
                ultimoAnoParticipacao = eleicao.Eleicao.dataValues.ano_eleicao;
            }
            const despesa_campanha = isNaN(eleicao.despesa_campanha) || eleicao.despesa_campanha < 0 ? "Não informado" : new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(eleicao.despesa_campanha)
            
            
           return {
               partido: eleicao.Partido.dataValues.sigla,
               eleicao: `${eleicao.Eleicao.dataValues.turno} turno - ${eleicao.Eleicao.dataValues.ano_eleicao}`,
               cargo: eleicao.Cargo.dataValues.nome_cargo,
               situacao_turno: eleicao.SituacaoTurno.dataValues.nome,
               unidade_eleitoral: `${eleicao.UnidadeEleitoral.dataValues.sigla} - ${eleicao.UnidadeEleitoral.dataValues.nome}`,
               ocupacao: eleicao.Ocupacao.dataValues.nome_ocupacao,
               grau_de_instrucao: eleicao.GrauDeInstrucao.dataValues.nome_instrucao,
               situacao_candidatura: eleicao.SituacaoCandidatura.dataValues.nome,
               ano_eleicao: eleicao.Eleicao.dataValues.ano_eleicao,
               situacao_reeleicao: eleicao.situacao_reeleicao ? "SIM" : "NÃO",
               idade_data_da_posse: eleicao.idade_data_da_posse,
               coligacao: eleicao.coligacao,
               nome_urna_candidato: eleicao.nome_urna_candidato,
               despesa_campanha: despesa_campanha,
           }
        });
        
        eleicoes.forEach(eleicao =>{            
            if (eleicao.ano_eleicao.toString().includes(ultimoAnoParticipacao.toString())){
                candidato.grau_de_instrucao = eleicao.grau_de_instrucao
                candidato.ocupacao = eleicao.ocupacao
            }
        })
        
        candidato.fidelidade_partidaria = `${1 / partidosDiferentes.size * 100}%`
        candidato.tempo_de_carreira = `${parseInt(ultimoAnoParticipacao) - parseInt(primeiroAnoParticipacao)} anos`
       
        eleicoes.sort((a, b) => {            
            const anoA = parseInt(a.eleicao.match(/\d{4}/)[0]);
            const anoB = parseInt(b.eleicao.match(/\d{4}/)[0]);

            return anoA - anoB;
        });

        //console.log(candidato)
        res.render("search-candidates-result", { candidato, eleicoes })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message, data: [] })

    }
}

module.exports = {
    getByName,
    getById
}
