const connection = require('../database/connection');

module.exports = {
    async  create(request, response) {
        const { id } = request.body;
        console.log(`Aqui livinha ${id}`)

        const medico = await connection('medicos')
            .where('id',id)
            .select('name')
            .first();

        if(!medico) {
            return response.status(400).json({error: 'ID de médico não encontrado'});
        }

        return response.json(medico);
    }
}