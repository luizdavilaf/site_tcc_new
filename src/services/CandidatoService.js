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

const countAll = () => {
    return Candidato.count({
        raw: true,
    })
}

const findByName = (name, pageSize, offset) => {
    //console.log(name)
    return Candidato.findAndCountAll({
        where: {
            nome: {
                [Sequelize.Op.like]: `%${name}%`
            } },
        limit: pageSize,
        offset: offset,
        raw: true, 
        order: [['NM_CANDIDATO', 'ASC']]       
    })
}

const findById = (id) => {
    return Candidato.findOne({
        where: {id},        
        include: [
            {
                model: CandidatoEleicao,
                raw: true,
                include:
                    [
                        {
                            model: Cargo,
                        },
                        {
                            model: SituacaoTurno,
                        },
                        {
                            model: UnidadeEleitoral,
                        },
                        {
                            model: Eleicao,
                        },
                        {
                            model: Ocupacao,
                        },
                        {
                            model: GrauDeInstrucao,
                        },
                        {
                            model: SituacaoCandidatura,
                        },
                        {
                            model: Partido,
                        },
                    ],
            },
            {
                model: Raca,
                raw: true,
            },            
            {
                model: Genero,
                raw: true,
            }
        ],              
    })
}

module.exports = {
    countAll,
    findById,
    findByName
}