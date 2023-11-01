const Eleicao = require("../models/Eleicao")
const { Sequelize } = require("sequelize");

const findAll = (turno, abrangencia) => {
    const queryOptions = {
        raw: true,
        order: [['ANO_ELEICAO', 'ASC'], ['NR_TURNO', 'ASC']]
    };

    const whereConditions = {};

    if (turno !== undefined) {
        whereConditions.NR_TURNO = turno;
    }

    if (abrangencia !== undefined) {
        whereConditions.TIPO_ELEICAO = abrangencia;
    }

    if (Object.keys(whereConditions).length > 0) {
        queryOptions.where = {
            [Sequelize.Op.and]: [whereConditions]
        };
    }

    return Eleicao.findAll(queryOptions);
}

const findById = (id) => {
    return Eleicao.findOne({
        where: {id},
        raw: true,       
    })
}

const countAll = () => {
    return Eleicao.count({
        group: [Sequelize.col('ANO_ELEICAO')],
        raw: true,
    })
}

module.exports = {
    countAll,
    findById,
    findAll
}