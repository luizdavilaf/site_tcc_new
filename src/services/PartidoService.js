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
        order: [['SG_PARTIDO', 'ASC']]
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('candidato->genero.DS_GENERO'), 'genero'],
            [Sequelize.fn('COUNT', Sequelize.col('candidato.id')), 'totalCandidatos'],
        ],
        //group: [Sequelize.col('candidato->Genero.DS_GENERO')],        
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('candidato->genero.DS_GENERO')
        ],
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.literal(`
                CASE
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 18 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 30 THEN '18-30 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 31 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 40 THEN '31-40 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 41 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 50 THEN '41-50 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 51 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 60 THEN '51-60 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 61 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 70 THEN '61-70 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 71 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 80 THEN '71-80 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 81 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 90 THEN '81-90 anos'
                    WHEN "candidatoEleicao"."NR_IDADE_DATA_POSSE" >= 91 AND "candidatoEleicao"."NR_IDADE_DATA_POSSE" <= 100 THEN '91-100 anos'
                    ELSE 'Idade inválida'
                END
            `), 'idade'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            "idade",
            "anoEleicao",
            "turno"
        ],
        order: [['idade', 'ASC']],
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('ocupacao.CATEGORIA'), 'ocupacao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('ocupacao.CATEGORIA'),
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
        ],
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('grauDeInstrucao.DS_GRAU_INSTRUCAO'), 'grau_instrucao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('grauDeInstrucao.DS_GRAU_INSTRUCAO')],
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('candidatoEleicao.ST_REELEICAO'), 'reeleito'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('candidatoEleicao.ST_REELEICAO')],
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
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.fn('COALESCE', Sequelize.col('candidato->raca.DS_COR_RACA'), 'Sem dados'), 'raca'],
            [Sequelize.fn('COUNT', Sequelize.col('candidato.id')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('candidato->raca.DS_COR_RACA')],
        raw: true,
        subQuery: false,
    })
}

const findById = (partidoId) => {
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