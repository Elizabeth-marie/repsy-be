exports.up = function (knex, Promise) {
    return knex.schema.createTable(`meds`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.varchar(`generic_name`, 255).notNullable()
        table.varchar(`brand_name`, 255).notNullable()
        table.varchar(`pharma_company`, 255).notNullable()
        table.varchar(`info`, 255).notNullable()
        table.string(`meds_photo`).defaultTo(`No Photo Provided`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`meds`)
}
