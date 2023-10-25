const Candidato = require("../models/Candidato")
const { Sequelize } = require("sequelize");
const CandidatoEleicao = require("../models/CandidatoEleicao");
const Raca = require("../models/Raca");
const Genero = require("../models/Genero");
const Cargo = require("../models/Cargo");
const SituacaoTurno = require("../models/SituacaoTurno");
const UnidadeEleitoral = require("../models/UnidadeEleitoral");
const Eleicao = require("../models/Eleicao");
const Ocupacao = require("../models/Ocupacao");
const GrauDeInstrucao = require("../models/GrauDeInstrucao");
const SituacaoCandidatura = require("../models/SituacaoCandidatura");
const Partido = require("../models/Partido");

const findAll = () => {
    return Partido.findAll({
        raw: true,
    })
}

const getPartidoEleicaoByGender = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: { 
            PartidoId: partidoId, 
            EleicaoId: eleicaoId
        },
        include:
            [
                {
                    model: Eleicao,
                    attributes: [],
                },               
                {
                    model: Candidato,
                    attributes: [],
                    include: {
                        model: Genero,
                        attributes: [],
                    }
                }
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],                    
            [Sequelize.col('Candidato->Genero.DS_GENERO'), 'genero'],
            [Sequelize.fn('COUNT', Sequelize.col('Candidato.id')), 'totalCandidatos'],
        ],
        //group: [Sequelize.col('Candidato->Genero.DS_GENERO')],        
        group: ['genero'],
        raw: true,
        subQuery: false,
    })
}

const getPartidoEleicaoByAge = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: {
            PartidoId: partidoId,
            EleicaoId: eleicaoId
        },
        include:
            [                
                {
                    model: Eleicao,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],           
            [Sequelize.col('CandidatoEleicao.NR_IDADE_DATA_POSSE'), 'idade'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('CandidatoEleicao.NR_IDADE_DATA_POSSE')],
        raw: true,
    })
}

const getPartidoEleicaoByOcupation = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: {
            PartidoId: partidoId,
            EleicaoId: eleicaoId
        },
        include:
            [                
                {
                    model: Eleicao,
                    attributes: [],
                },
                {
                    model: Ocupacao,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],           
            [Sequelize.col('Ocupacao.DS_OCUPACAO'), 'ocupacao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Ocupacao.DS_OCUPACAO')],
        raw: true,
    })
}

const getPartidoEleicaoByDegree = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: {
            PartidoId: partidoId,
            EleicaoId: eleicaoId
        },
        include:
            [              
                {
                    model: Eleicao,
                    attributes: [],
                },
                {
                    model: GrauDeInstrucao,
                    attributes: [],
                }
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],            
            [Sequelize.col('GrauDeInstrucao.DS_GRAU_INSTRUCAO'), 'grau_instrucao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('GrauDeInstrucao.DS_GRAU_INSTRUCAO')],
        raw: true,

    })
}

const getPartidoEleicaoReelection = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: {
            PartidoId: partidoId,
            EleicaoId: eleicaoId
        },
        include:
            [                
                {
                    model: Eleicao,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],          
            [Sequelize.col('CandidatoEleicao.ST_REELEICAO'), 'reeleito'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('CandidatoEleicao.ST_REELEICAO')],
        raw: true,
    }).then(results => {
        results.forEach(result => {
            result.reeleito = result.reeleito === 0 ? 'NAO' : 'SIM';
        });
        return results;
    });
}

const getPartidoEleicaoByRace = (partidoId, eleicaoId) => {
    return CandidatoEleicao.findAll({
        where: {
            PartidoId: partidoId,
            EleicaoId: eleicaoId
        },
        include:
            [                
                {
                    model: Eleicao,
                    attributes: [],
                },
                {
                    model: Candidato,
                    attributes: [],
                    include: {
                        model: Raca,
                        attributes: []
                    }
                }
            ],
        attributes: [          
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],           
            [Sequelize.fn('COALESCE', Sequelize.col('Candidato->Raca.DS_COR_RACA'), 'Sem dados'), 'raca'],
            [Sequelize.fn('COUNT', Sequelize.col('Candidato.id')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Candidato->Raca.DS_COR_RACA')],
        raw: true,
        subQuery: false,
    })
}

const findById = (partidoId)=>{
    return Partido.findOne({
        where: {
            id: partidoId
        },
        raw: true,
    })
}

const countAll = () => {
    return Partido.count({
        raw: true,
    })
}


module.exports = {
    countAll,
    getPartidoEleicaoByRace,
    getPartidoEleicaoReelection,
    getPartidoEleicaoByDegree,
    getPartidoEleicaoByOcupation,
    getPartidoEleicaoByAge,
    findById,
    findAll,
    getPartidoEleicaoByGender,
}