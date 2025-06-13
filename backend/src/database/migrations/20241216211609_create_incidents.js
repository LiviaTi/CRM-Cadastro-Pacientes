
exports.up = function(knex) {
     return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
       
        table.string('medico_id').notNullable();

        table.foreign('medico_id').references('id').inTable('medicos');
      });
};


exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
