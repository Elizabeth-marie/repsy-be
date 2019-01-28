
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reps_meds').del()
    .then(function () {
      // Inserts seed entries
      return knex('reps_meds').insert([
        { id: 1, reps_id: 1, meds_id: 3},
        { id: 2, reps_id: 2, meds_id: 1},
        { id: 3, reps_id: 3, meds_id: 1},
        { id: 4, reps_id: 2, meds_id: 2 },
        { id: 5, reps_id: 3, meds_id: 3 },
        { id: 6, reps_id: 1, meds_id: 1 },
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('reps_meds_id_seq', (SELECT MAX(id) FROM reps_meds))`)
    })
}
