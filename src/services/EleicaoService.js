const Eleicao = require("../models/Eleicao")
const { Sequelize } = require("sequelize");

const findAll = () => {
    return Eleicao.findAll({
        raw: true,
        order: [['ANO_ELEICAO', 'ASC']]
    })
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