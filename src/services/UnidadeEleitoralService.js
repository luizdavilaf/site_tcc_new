const UnidadeEleitoral = require("../models/UnidadeEleitoral")
const { Sequelize } = require("sequelize");

const findAll = () => {
    return UnidadeEleitoral.findAll()
}

const findAllAbrangencies = () => {
    return UnidadeEleitoral.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('TP_ABRANGENCIA')), 'abrangencia']],
        distinct: true, 
        raw: true,
    })
}

const findAllUnities = () => {
    return UnidadeEleitoral.findAll({       
        raw: true,
        order: [['TP_ABRANGENCIA', 'ASC'], ['SG_UF', 'ASC'], ['NM_UE', 'ASC']]
    })
}

const findUnitiesByAbrangengy = (abrangency) => {
    return UnidadeEleitoral.findAll({
        where: { abrangencia: abrangency },
        distinct: true,
        raw: true,
        order: [['SG_UF', 'ASC'], ['NM_UE', 'ASC']]
    })
}

module.exports = {
    findAllUnities,
    findAll,
    findAllAbrangencies,
    findUnitiesByAbrangengy
}