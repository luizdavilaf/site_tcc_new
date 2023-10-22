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

module.exports = {
    findById,
    findAll
}