const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../db/sequelize-connection")

const Cargo = sequelize.define('cargo', {    
    nome_cargo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Se cada cargo deve ser único
        comment: 'Descrição do cargo',
        field: "DS_CARGO",
    },
}, {
    sequelize,        
    comment: 'Tabela que armazena informações sobre os cargos dos candidatos, criada para categorizar as profissoes',    
    tableName: "cargo"
});

module.exports = Cargo;