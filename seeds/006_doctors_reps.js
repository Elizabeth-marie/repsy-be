
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors_reps').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors_reps').insert([
        {id: 1, reps_id: 1, doctors_id: 2},
        {id: 2, reps_id: 3, doctors_id: 4},
        {id: 3, reps_id: 1, doctors_id: 3}
      ])
      .then(function() { return knex.raw("SELECT setval('doctors_reps_id_seq', (SELECT MAX(id) FROM doctors_reps))")
      })
    })
}
