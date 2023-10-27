const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../db/sequelize-connection")

const SituacaoTurno = sequelize.define('situacaoTurno', {         
    nome: {
        field: "DS_SIT_TOT_TURNO",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Situação de totalização do candidato, naquele turno da eleição, após a totalização dos votos."
    }
    ,   
}, {
    sequelize,
    comment: "tabela das situacoes de turno existentes.",
    tableName: "situacaoTurno"
});

// Defina as associações


module.exports = SituacaoTurno;