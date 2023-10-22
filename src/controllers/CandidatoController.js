
const moment = require("moment");
const CandidatoService = require("../services/CandidatoService")

const getByName = async (req, res) => {
    try {
        //console.log(req.body.nome)
        if (!req.body.nome || req.body.nome.length < 3){
            throw new Error("Pelo menos 3 letras devem ser enviadas para busca")
        }

        const page = req.body.page || 1; // Página padrão é a primeira página
        const pageSize = req.body.pageSize || 50; // Tamanho da página padrão é 50

        // Calcular o offset com base na página e no tamanho da página
        const offset = (page - 1) * pageSize;

        const candidatos = await CandidatoService.findByName(req.body.nome, pageSize, offset)
        //console.log(candidatos)
        return res.json({ success: true, data: candidatos })
    } catch (error) {
        return res.json({success: false, message: error.message, data: []})

    }
}

const getById = async (req, res) => {
    try {
        //console.log(req.query.candidatoid)
        const data = await CandidatoService.findById(req.query.candidatoid)
        const candidato = {
            nome: data.nome,
            municipio_nascimento: data.municipio_nascimento,
            data_nascimento: moment(data.data_nascimento).format("DD-MM-YYYY"),
            idade: moment().diff(moment(data.data_nascimento), 'years'),
            raca: data.Raca.nome,
            genero: data.Genero.nome_genero,
            local_nascimento: `${data.municipio_nascimento} - ${data.estado_nascimento}`,
            grau_de_instrucao: "a calcular",
            fidelidade_partidaria: "a calcular"

        }  
        console.log(candidato)
        res.render("search-candidates-result", { candidato })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message, data: [] })

    }
}

module.exports = {
    getByName,
    getById
}
