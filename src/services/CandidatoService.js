const  Candidato  = require("../models/Candidato")
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
                [Sequelize.Op.iLike]: `%${name}%`
            } 
        },    
        attributes: ['nome', 'id'],
        limit: pageSize,
        offset: offset,
        raw: true, 
        order: [['NM_CANDIDATO', 'ASC']],             
    })
}

/* const findByName = (name, pageSize, offset) => {
    return sequelize.query(
        `SELECT DISTINCT ON (id) id, "NM_CANDIDATO" as nome
    FROM (
      SELECT id, "NM_CANDIDATO" FROM "candidato" WHERE "NM_CANDIDATO" ILIKE :name
      UNION
      SELECT "CandidatoId" AS id, candidato."NM_CANDIDATO" AS "NM_CANDIDATO" FROM "candidatoEleicao"
      JOIN "candidato" on candidato.id = "candidatoEleicao"."CandidatoId"
      WHERE "NM_URNA_CANDIDATO" ILIKE :name
    ) AS results
    ORDER BY id
    LIMIT :pageSize OFFSET :offset`,
        {
            replacements: { name: `%${name}%`, pageSize, offset },
            type: sequelize.QueryTypes.SELECT,
        }
    );
};

const countByName = (name) => {
    return sequelize.query(
        `SELECT COUNT(*) AS total
            FROM (
                SELECT DISTINCT ON (id) id, "NM_CANDIDATO" as nome
                    FROM (
                        SELECT id, "NM_CANDIDATO" FROM "candidato" WHERE "NM_CANDIDATO" ILIKE :name
                        UNION
                        SELECT "CandidatoId" AS id, candidato."NM_CANDIDATO" AS "NM_CANDIDATO" FROM "candidatoEleicao"
                        JOIN "candidato" on candidato.id = "candidatoEleicao"."CandidatoId"
                        WHERE "NM_URNA_CANDIDATO" ILIKE :name
                    )as dist_query
            ) AS count_query`,
        {
            replacements: { name: `%${name}%` },
            type: sequelize.QueryTypes.SELECT,
            raw: true,
        }
    );
};
 */


const findById = (id) => {
    return Candidato.findOne({
        where: {id},               
        include: [
            {
                model: CandidatoEleicao,                                                                                              
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