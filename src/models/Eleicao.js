const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../db/sequelize-connection")


const Eleicao = sequelize.define('eleicao', {  
    ano_eleicao: {
        field: "ANO_ELEICAO",
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "ano da eleicao"
    },
    turno: {
        field: "NR_TURNO",
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "turno da eleicao"
    },
    TIPO_ELEICAO: {
        field: "TIPO_ELEICAO",
        type: DataTypes.STRING,  
        comment: "REFERENCIA A ABRANGENCIA DA ELEICAO E UNIDADE ELEITORAL"     
    }
}, {
    sequelize,
    primaryKey: ['ANO_ELEICAO', 'NR_TURNO'],     
    tableName: "eleicao"
});

module.exports = Eleicao;