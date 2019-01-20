
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions_meds').del()
    .then(function () {
      // Inserts seed entries
      return knex('conditions_meds').insert([
        {id: 1, meds_id: 1, conditions_id: 1 },
        {id: 2, meds_id: 2, conditions_id: 2 },
        {id: 3, meds_id: 3, conditions_id: 3 },
        {id: 4, meds_id: 2, conditions_id: 1 },
        {id: 5, meds_id: 3, conditions_id: 1 },
      ]);
    });
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('conditions_meds_id_seq', (SELECT MAX(id) FROM conditions_meds))`)
    })
};
