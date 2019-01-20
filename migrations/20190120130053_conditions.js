exports.up = function (knex, Promise) {
    return knex.schema.createTable(`conditions`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.varchar(`name`, 255).notNullable()
        table.integer(`specialties_id`).notNullable()
        table.foreign(`specialties_id`).references(`specialties.id`).onDelete(`CASCADE`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`conditions`)
}