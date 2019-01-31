exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors_conditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors_conditions').insert([
        {join_id: 1, doctors_id: 1, conditions_id: 1 },
        {join_id: 2, doctors_id: 2, conditions_id: 2 },
        {join_id: 3, doctors_id: 3, conditions_id: 3 },
        {join_id: 4, doctors_id: 2, conditions_id: 1 },
        {join_id: 5, doctors_id: 3, conditions_id: 1 },
        {join_id: 6, doctors_id: 2, conditions_id: 5 },
        {join_id: 7, doctors_id: 2, conditions_id: 17 },
        {join_id: 8, doctors_id: 2, conditions_id: 29 },
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('doctors_conditions_join_id_seq', (SELECT MAX(join_id) FROM doctors_conditions))`)
    })
};
