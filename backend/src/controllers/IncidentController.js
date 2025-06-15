const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;


        const [count] = await connection('incidents').count();
        
        console.log(count);

        const incidents = await connection('incidents')
            .join('medicos','medicos.id','=','incidents.medico_id')
            .limit(5)
            .offset((page - 1)* 5)
            .select([
                'incidents.*',
                'medicos.name',
                'medicos.email',
                'medicos.whatsapp',
                'medicos.city',
                'medicos.uf'
            ]);
      
        response.header('X-Total-Count',count['count(*)']);
        
        return response.json(incidents);
     },

    async create(request, response){
        const {title, description, value} = request.body;     
        const medico_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            medico_id,
        });

        return response.json({id});
    
    },
    
    async delete(request, response){
    
        const {id} = request.params;
        const medico_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('medico_id')
            .first();

        if(incident?.medico_id !== medico_id){
            return response.status(401).json({error: 'Operação não permitida'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
}