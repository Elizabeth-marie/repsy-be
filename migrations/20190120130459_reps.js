exports.up = function (knex, Promise) {
    return knex.schema.createTable(`reps`, function (table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.varchar(`fname`, 255).notNullable()
        table.varchar(`lname`, 255).notNullable()
        table.varchar(`company`, 255).notNullable()
        table.varchar(`credentials`, 255).notNullable()
        table.varchar(`city`, 255).defaultTo(`Not Provided`)
        table.varchar(`state`, 255).defaultTo(`Not Provided`)
        table.integer(`zip`).notNullable()
        table.varchar(`email`, 255).notNullable().unique()
        table.varchar(`password`, 255).notNullable()
        table.string(`reps_photo`).defaultTo(`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`)
        table.timestamps(true, true)
    })
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(`reps`)
}
