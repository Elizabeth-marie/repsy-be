exports.up = function (knex, Promise) {
    return knex.schema.createTable(`doctors_reps`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.integer(`reps_id`).notNullable()
        table.foreign(`reps_id`).references(`reps.id`).onDelete(`CASCADE`)
        table.integer(`doctors_id`).notNullable()
        table.foreign(`doctors_id`).references(`doctors.id`).onDelete(`CASCADE`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`doctors_reps`)
}