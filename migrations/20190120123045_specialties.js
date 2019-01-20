exports.up = function (knex, Promise) {
        return knex.schema.createTable(`specialties`, function (table) {
            // TABLE COLUMN DEFINITIONS HERE
            table.increments()
            table.varchar(`name`, 255).notNullable().unique()
            table.timestamps(true, true)
        })
    }
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`specialties`)
}
