const Eleicao = require("../models/Eleicao")
const { Sequelize } = require("sequelize");

const findAll = () => {
    return Eleicao.findAll({
        raw: true,
        order: [['ANO_ELEICAO', 'ASC']]
    })
}

module.exports = {
    findAll
}