exports.up = function (knex, Promise) {
    return knex.schema.createTable(`reps_meds`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.integer(`reps_id`).notNullable()
        table.foreign(`reps_id`).references(`reps.id`).onDelete(`CASCADE`)
        table.integer(`meds_id`).notNullable()
        table.foreign(`meds_id`).references(`meds.id`).onDelete(`CASCADE`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`reps_meds`)
}