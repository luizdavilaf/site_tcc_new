const Cargo = require("../models/Cargo")
const { Sequelize } = require("sequelize");

const findAll = () => {
    return Cargo.findAll({
        raw: true,
    })
}

module.exports = {
    findAll
}