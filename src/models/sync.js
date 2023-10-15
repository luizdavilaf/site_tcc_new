

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

Candidato.belongsTo(Genero);
Candidato.belongsTo(Raca);

CandidatoEleicao.belongsTo(Candidato);
Candidato.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Eleicao);
Eleicao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Ocupacao);
Ocupacao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Cargo);
Cargo.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(GrauDeInstrucao);
GrauDeInstrucao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoTurno);
SituacaoTurno.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(UnidadeEleitoral);
UnidadeEleitoral.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoCandidatura);
SituacaoCandidatura.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Partido);
Partido.hasMany(CandidatoEleicao);




console.log('Sync Models');
sequelize.sync();

