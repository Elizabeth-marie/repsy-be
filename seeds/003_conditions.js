
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('conditions').insert([
        {id: 1, name: 'Breast Cancer', specialties_id: 1},
        {id: 2, name: 'Lung Cancer', specialties_id: 1},
        {id: 3, name: 'Prostate Cancer', specialties_id: 1}
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('conditions_id_seq', (SELECT MAX(id) FROM conditions))`)
    })
}
