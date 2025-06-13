const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const medicos = await connection('medicos').select('*');

          return response.json(medicos);
     },

    async create(request, response) {
        const { name, email, whatsapp, city,uf} = request.body;

        const id= crypto.randomBytes(4).toString('HEX');
    
        await connection('medicos').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    }
}