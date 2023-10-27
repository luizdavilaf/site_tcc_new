

const Candidato = require('./Candidato');
const Eleicao = require('./Eleicao');
const Ocupacao = require('./Ocupacao');
const Cargo = require('./Cargo');
const Partido = require('./Partido');
const CandidatoEleicao = require('./CandidatoEleicao');
const UnidadeEleitoral = require('./UnidadeEleitoral');
const GrauDeInstrucao = require('./GrauDeInstrucao');
const Raca = require('./Raca');
const Genero = require('./Genero');
const SituacaoCandidatura = require('./SituacaoCandidatura');
const SituacaoTurno = require('./SituacaoTurno');
const sequelize = require("../../db/sequelize-connection")

Genero.hasMany(Candidato, {
    foreignKey: 'GeneroId',
});
Raca.hasMany(Candidato, {
    foreignKey: 'RacaId',
});

Candidato.belongsTo(Genero, {foreignKey: 'GeneroId'
})
Candidato.belongsTo(Raca, {
    foreignKey: 'RacaId'
});

CandidatoEleicao.belongsTo(Candidato, {
    foreignKey: 'CandidatoId',   
});
Candidato.hasMany(CandidatoEleicao, {
    foreignKey: 'CandidatoId',
});

CandidatoEleicao.belongsTo(Eleicao, {
    foreignKey: 'EleicaoId'
});
Eleicao.hasMany(CandidatoEleicao, {
    foreignKey: 'EleicaoId'
});

CandidatoEleicao.belongsTo(Ocupacao, {
    foreignKey: 'OcupacaoId'
});
Ocupacao.hasMany(CandidatoEleicao, {
    foreignKey: 'OcupacaoId'
});

CandidatoEleicao.belongsTo(Cargo, {
    foreignKey: 'CargoId'
}
    );
Cargo.hasMany(CandidatoEleicao, {
    foreignKey: 'CargoId'
});

CandidatoEleicao.belongsTo(GrauDeInstrucao, {
    foreignKey: 'GrauDeInstrucaoId'
});
GrauDeInstrucao.hasMany(CandidatoEleicao, {
    foreignKey: 'GrauDeInstrucaoId'
});

CandidatoEleicao.belongsTo(SituacaoTurno, {
    foreignKey: 'SituacaoTurnoId'
});
SituacaoTurno.hasMany(CandidatoEleicao, {
    foreignKey: 'SituacaoTurnoId'
});

CandidatoEleicao.belongsTo(UnidadeEleitoral, {
    foreignKey: 'UnidadeEleitoralId'
});
UnidadeEleitoral.hasMany(CandidatoEleicao, {
    foreignKey: 'UnidadeEleitoralId'
});

CandidatoEleicao.belongsTo(SituacaoCandidatura, {
    foreignKey: 'SituacaoCandidaturaId'
});
SituacaoCandidatura.hasMany(CandidatoEleicao, {
    foreignKey: 'SituacaoCandidaturaId'
});

CandidatoEleicao.belongsTo(Partido, {
    foreignKey: 'PartidoId'
});
Partido.hasMany(CandidatoEleicao, {
    foreignKey: 'PartidoId'
});




console.log('Sync Models');
sequelize.sync();

