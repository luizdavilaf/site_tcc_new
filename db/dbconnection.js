

module.exports = {
    development: {
        username: 'postgres',
        password: config.secretdb,
        database: 'eleicao_new',
        host: config.urldb,
        dialect: 'postgres',
        logging: false,
    },
    
    // Adicione configurações para produção e teste, se necessário.
};
