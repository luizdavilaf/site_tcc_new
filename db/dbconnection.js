

module.exports = {
    development: {
        username: 'postgres',
        password: config.secretdb,
        database: 'eleicao_new',
        host: config.urldb,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5, // número máximo de conexões no pool
            min: 0, // número mínimo de conexões no pool
            acquire: 30000, // tempo máximo, em milissegundos, que a pool tentará obter uma conexão antes de lançar um erro
            idle: 10000 // tempo máximo, em milissegundos, que uma conexão pode ficar inativa no pool antes de ser desconectada
        }
    },
    
    // Adicione configurações para produção e teste, se necessário.
};
