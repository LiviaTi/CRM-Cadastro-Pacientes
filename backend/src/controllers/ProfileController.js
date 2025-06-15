const connection = require("../database/connection");

module.exports ={
    async index(request, response){
        const medico_id = request.headers.authorization;
        console.log(`Livinha ${medico_id}`)

        const incidents = await connection('incidents')
            .where('medico_id', medico_id)
            .select('*');

        return response.json(incidents);
    }
}