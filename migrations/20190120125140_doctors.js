exports.up = function (knex, Promise) {
    return knex.schema.createTable(`doctors`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.varchar(`fname`, 255).notNullable()
        table.varchar(`lname`, 255).notNullable()
        table.integer(`specialties_id`).notNullable()
        table.foreign(`specialties_id`).references(`specialties.id`).onDelete(`CASCADE`)
        table.varchar(`npi_num`, 10).notNullable().unique()
        table.varchar(`clinic_name`, 255).defaultTo(`Not Provided`)
        table.varchar(`clinic_address`, 255).defaultTo(`Not Provided`)
        table.varchar(`city`, 255).defaultTo(`Not Provided`)
        table.varchar(`state`, 255).defaultTo(`Not Provided`)
        table.integer(`zip`).notNullable()
        table.varchar(`email`, 255).notNullable().unique()
        table.varchar(`pswd_hash`, 255).notNullable()
        table.string(`photo`).defaultTo(`No Photo Provided`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`doctors`)
}
