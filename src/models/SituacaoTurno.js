const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../db/sequelize-connection")

const SituacaoTurno = sequelize.define('situacaoTurno', {         
    nome: {
        field: "DS_SIT_TOT_TURNO",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Situação de totalização do candidato, naquele turno da eleição, após a totalização dos votos."
    },  
    foi_eleito: {
        field: "foiEleito",
        type: DataTypes.BOOLEAN,
        comment: `Indica se a candidata ou candidato está concorrendo ou não à reeleição. Pode assumir os valores: S - Sim e N - Não.  Informação autodeclarada pela candidata ou candidato. Observação: Reeleição é a renovação do mandato para o mesmo cargo eletivo, por mais um período, na mesma circunscrição eleitoral na qual a representante ou o representante, no pleito imediatamente anterior, se elegeu. Pelo sistema eleitoral brasileiro, o presidente da República, os governadores de estado e os prefeitos podem ser reeleitos para um único período subsequente, o que se aplica também ao vice-presidente da República, aos vice-governadores e aos vice-prefeitos. Já os parlamentares (senadores, deputados federais e estaduais/distritais e vereadores) podem se reeleger ilimitadas vezes. A possibilidade da reeleição compreende algumas regras mais específicas detalhadas no sistema eleitoral brasileiro`
    }, 
}, {
    sequelize,
    comment: "tabela das situacoes de turno existentes.",
    tableName: "situacaoTurno"
});

// Defina as associações


module.exports = SituacaoTurno;