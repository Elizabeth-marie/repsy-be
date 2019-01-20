exports.up = function (knex, Promise) {
    return knex.schema.createTable(`conditions_meds`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.integer(`meds_id`).notNullable()
        table.foreign(`meds_id`).references(`meds.id`).onDelete(`CASCADE`)
        table.integer(`conditions_id`).notNullable()
        table.foreign(`conditions_id`).references(`conditions.id`).onDelete(`CASCADE`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`conditions_meds`)
}