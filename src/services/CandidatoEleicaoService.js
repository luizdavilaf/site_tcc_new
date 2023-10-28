const Cargo = require("../models/Cargo")
const CandidatoEleicao = require("../models/CandidatoEleicao")
const Eleicao = require("../models/Eleicao")
const Ocupacao = require("../models/Ocupacao")
const GrauDeInstrucao = require("../models/GrauDeInstrucao")
const SituacaoTurno = require("../models/SituacaoTurno")
const UnidadeEleitoral = require("../models/UnidadeEleitoral")
const Partido = require("../models/Partido")
const Genero = require("../models/Genero")
const Raca = require("../models/Raca")
const Candidato = require("../models/Candidato")
const { Sequelize } = require("sequelize");
const sequelize = require("../../db/sequelize-connection");

const getCandidatoEleicaoByGender = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
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
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('candidato->genero.DS_GENERO'), 'genero'],
            [Sequelize.fn('COUNT', Sequelize.col('candidato.id')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('candidato->genero.DS_GENERO'),
            'genero'],
        raw: true,
        subQuery: false,
    })
}

const getCandidatoEleicaoByDegree = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
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
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('grauDeInstrucao.DS_GRAU_INSTRUCAO'), 'grau_instrucao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('grauDeInstrucao.DS_GRAU_INSTRUCAO')],
        raw: true,

    })
}

const getCandidatoEleicaoByAge = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
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
            'anoEleicao',
            'turno',
            'estado',
            'nome',
            'idade'
        ],
        order: [['idade', 'ASC']],
        raw: true,

    })
}


const getCandidatoEleicaoByOcupation = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
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
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('ocupacao.DS_OCUPACAO'), 'ocupacao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('ocupacao.DS_OCUPACAO')],
        raw: true,
    })
}

const getCandidatoEleicaoByParty = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                },
                {
                    model: Partido,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('partido.SG_PARTIDO'), 'partido'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('partido.SG_PARTIDO')],
        raw: true,
    })
}

const getCandidatoEleicaoByRace = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
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
            //[Sequelize.col('candidato->Raca.DS_COR_RACA'), 'raca'],
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.fn('COALESCE', Sequelize.col('candidato->raca.DS_COR_RACA'), 'Sem dados'), 'raca'],
            [Sequelize.fn('COUNT', Sequelize.col('candidato.id')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('candidato->raca.DS_COR_RACA')],
        raw: true,
        subQuery: false,
    })
}

const getCandidatoEleicaoReelection = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
        where: {
            EleicaoId: eleicao,
            UnidadeEleitoralId: regiao
        },
        include:
            [
                {
                    model: Cargo,
                    attributes: [],
                    where: cargo == "todos" ? {} : { id: cargo }
                },
                {
                    model: SituacaoTurno,
                    attributes: [],
                    where: situacao_turno == "todos" ? {}
                        : situacao_turno == "todosEleitos" ? { foiEleito: true }
                            : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('unidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('unidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('candidatoEleicao.ST_REELEICAO'), 'reeleito'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [
            Sequelize.col('eleicao.ANO_ELEICAO'),
            Sequelize.col('eleicao.NR_TURNO'),
            Sequelize.col('unidadeEleitoral.SG_UF'),
            Sequelize.col('unidadeEleitoral.NM_UE'),
            Sequelize.col('candidatoEleicao.ST_REELEICAO')],
        raw: true,
    }).then(results => {
        results.forEach(result => {
            result.reeleito = result.reeleito === 0 ? 'NAO' : 'SIM';
        });
        return results;
    });
}

module.exports = {
    getCandidatoEleicaoReelection,
    getCandidatoEleicaoByRace,
    getCandidatoEleicaoByGender,
    getCandidatoEleicaoByDegree,
    getCandidatoEleicaoByAge,
    getCandidatoEleicaoByOcupation,
    getCandidatoEleicaoByParty,
}