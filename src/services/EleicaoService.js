const Eleicao = require("../models/Eleicao")
const { Sequelize } = require("sequelize");

const findAll = (turno) => {
    const queryOptions = {
        raw: true,
        order: [['ANO_ELEICAO', 'ASC'], ['NR_TURNO', 'ASC']]
    };

    if (turno !== undefined) {
        queryOptions.where = { "NR_TURNO": turno };
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