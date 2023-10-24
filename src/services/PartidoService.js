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

const findById = (partidoId)=>{
    return Partido.findOne({
        where: {
            id: partidoId
        },
        raw: true,
    })
}


module.exports = {
    findById,
    findAll,
    getPartidoEleicaoByGender,
}