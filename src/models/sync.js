

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

Genero.hasMany(Candidato);
Raca.hasMany(Candidato);

Candidato.belongsTo(Genero, {foreignKey: 'GeneroId'
})
Candidato.belongsTo(Raca, {
    foreignKey: 'RacaId'
});

CandidatoEleicao.belongsTo(Candidato, {
    foreignKey: 'CandidatoId'
});
Candidato.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Eleicao, {
    foreignKey: 'EleicaoId'
});
Eleicao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Ocupacao, {
    foreignKey: 'OcupacaoId'
});
Ocupacao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Cargo, {
    foreignKey: 'CargoId'
}
    );
Cargo.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(GrauDeInstrucao, {
    foreignKey: 'GrauDeInstrucaoId'
});
GrauDeInstrucao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoTurno, {
    foreignKey: 'SituacaoTurnoId'
});
SituacaoTurno.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(UnidadeEleitoral, {
    foreignKey: 'UnidadeEleitoralId'
});
UnidadeEleitoral.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoCandidatura, {
    foreignKey: 'SituacaoCandidaturaId'
});
SituacaoCandidatura.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Partido, {
    foreignKey: 'PartidoId'
});
Partido.hasMany(CandidatoEleicao);




console.log('Sync Models');
sequelize.sync();

