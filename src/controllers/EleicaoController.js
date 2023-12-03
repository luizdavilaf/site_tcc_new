
const EleicaoService = require("../services/EleicaoService")

const getAll = async (req, res) => {
    try {
        const eleicoes = await EleicaoService.findAll()      
        return res.json({ success: true, data: eleicoes })
    } catch (error) {
        res.status(500).render('error.ejs');
        //return res.json({success: false, message: error.message})

    }
}

module.exports = {
    getAll
}
