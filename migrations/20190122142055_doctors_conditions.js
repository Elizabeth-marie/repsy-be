exports.up = function (knex, Promise) {
    return knex.schema.createTable(`doctors_conditions`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments('join_id')
        table.integer(`doctors_id`).notNullable()
        table.foreign(`doctors_id`).references(`doctors.id`).onDelete(`CASCADE`)
        table.integer(`conditions_id`).notNullable()
        table.foreign(`conditions_id`).references(`conditions.id`).onDelete(`CASCADE`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`doctors_conditions`)
}
