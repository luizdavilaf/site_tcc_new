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
const  sequelize  = require("../../db/sequelize-connection");

const getCandidatoEleicaoByGender = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },
                {
                    model: Candidato,
                    attributes: [],
                    include: {
                        model: Genero,
                        attributes: []
                    }
                }
                /* ,
                {
                    model: GrauDeInstrucao,                    
                } */
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('Candidato->Genero.DS_GENERO'), 'genero'],
            [Sequelize.fn('COUNT', Sequelize.col('Candidato.id')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Candidato->Genero.DS_GENERO')],        
        raw: true,
        subQuery: false,
    })
}

const getCandidatoEleicaoByDegree = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },                                
                {
                    model: GrauDeInstrucao,    
                    attributes: [],                
                }
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('GrauDeInstrucao.DS_GRAU_INSTRUCAO'), 'grau_instrucao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],            
        ],
        group: [Sequelize.col('GrauDeInstrucao.DS_GRAU_INSTRUCAO')],
        
        raw: true,
        
    })
}

const getCandidatoEleicaoByAge = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },                
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('CandidatoEleicao.NR_IDADE_DATA_POSSE'), 'idade'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('CandidatoEleicao.NR_IDADE_DATA_POSSE')],

        raw: true,

    })
}

const getCandidatoEleicaoByDegree2 = (eleicao, regiao, situacao_turno, cargo) => {
    const queryTotalPorGeneroEGrau = `
    WITH CandidatoEleicaoCTE AS (
        SELECT
            candidatoEleicao.id AS CandidatoEleicaoId,
            candidato.GeneroId,
            grauDeInstrucao.id AS GrauDeInstrucaoId
        FROM candidatoEleicao
        LEFT JOIN candidato ON candidatoEleicao.CandidatoId = Candidato.id
        LEFT JOIN grauDeInstrucao ON candidatoEleicao.GrauDeInstrucaoId = grauDeInstrucao.id
        WHERE candidatoEleicao.EleicaoId = :eleicao
        AND candidatoEleicao.UnidadeEleitoralId = :regiao
        AND (:situacao_turno IS NULL OR candidatoEleicao.SituacaoTurnoId = :situacao_turno)
        AND (:cargo IS NULL OR candidatoEleicao.CargoId = :cargo)
    )
    SELECT
        genero.DS_GENERO AS Genero,
        COUNT(CandidatoEleicaoCTE.CandidatoEleicaoId) AS TotalPorGenero,
        grauDeInstrucao.DS_GRAU_INSTRUCAO AS GrauDeInstrucao,
        COUNT(CandidatoEleicaoCTE.CandidatoEleicaoId) AS TotalPorGrauInstrucao
    FROM CandidatoEleicaoCTE
    LEFT JOIN genero ON CandidatoEleicaoCTE.GeneroId = genero.id    
    LEFT JOIN grauDeInstrucao ON CandidatoEleicaoCTE.GrauDeInstrucaoId = grauDeInstrucao.id
    GROUP BY genero.DS_GENERO, grauDeInstrucao.DS_GRAU_INSTRUCAO;
`;

    sequelize.query(queryTotalPorGeneroEGrau, {
        replacements: { eleicao, regiao, situacao_turno, cargo },
        type: Sequelize.QueryTypes.SELECT
    }).then((results)=>{
        console.log(results)
    })
}

const getCandidatoEleicaoByOcupation = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },
                {
                    model: Ocupacao,
                    attributes: [],                    
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('Ocupacao.DS_OCUPACAO'), 'ocupacao'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Ocupacao.DS_OCUPACAO')],
        raw: true,
    })
}

const getCandidatoEleicaoByParty = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },
                {
                    model: Partido,
                    attributes: [],
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.col('Partido.SG_PARTIDO'), 'partido'],
            [Sequelize.fn('COUNT', Sequelize.col('CandidatoId')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Partido.SG_PARTIDO')],
        raw: true,
    })
}

const getCandidatoEleicaoByRace = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
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
            //[Sequelize.col('Candidato->Raca.DS_COR_RACA'), 'raca'],
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
            [Sequelize.fn('COALESCE', Sequelize.col('Candidato->Raca.DS_COR_RACA'), 'Sem dados'), 'raca'],
            [Sequelize.fn('COUNT', Sequelize.col('Candidato.id')), 'totalCandidatos'],
        ],
        group: [Sequelize.col('Candidato->Raca.DS_COR_RACA')],
        raw: true,
        subQuery: false,
    })
}

const getCandidatoEleicaoReelection = (eleicao, regiao, situacao_turno, cargo) => {
    return CandidatoEleicao.findAll({
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
                    where: situacao_turno == "todos" ? {} : { id: situacao_turno }
                }
                ,
                {
                    model: UnidadeEleitoral,
                    attributes: [],
                    where: { id: regiao }
                }
                ,
                {
                    model: Eleicao,
                    attributes: [],
                    where: { id: eleicao }
                },
            ],
        attributes: [
            [Sequelize.col('Eleicao.ANO_ELEICAO'), 'anoEleicao'],
            [Sequelize.col('Eleicao.NR_TURNO'), 'turno'],
            [Sequelize.col('UnidadeEleitoral.SG_UF'), 'estado'],
            [Sequelize.col('UnidadeEleitoral.NM_UE'), 'nome'],
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

module.exports = {
    getCandidatoEleicaoReelection,
    getCandidatoEleicaoByRace,
    getCandidatoEleicaoByGender,
    getCandidatoEleicaoByDegree,
    getCandidatoEleicaoByDegree2,
    getCandidatoEleicaoByAge,
    getCandidatoEleicaoByOcupation,
    getCandidatoEleicaoByParty,
}