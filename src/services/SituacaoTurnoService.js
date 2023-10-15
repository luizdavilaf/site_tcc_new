const SituacaoTurno = require("../models/SituacaoTurno")
const { Sequelize } = require("sequelize");

const findAll = () => {
    return SituacaoTurno.findAll({
        raw: true,
    })
}

module.exports = {
    findAll
}