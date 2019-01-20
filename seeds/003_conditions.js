
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, name: 'Breast Cancer', specialties_id: 1},
        {id: 2, name: 'Lung Cancer', specialties_id: 1},
        {id: 3, name: 'Prostate Cancer', specialties_id: 1}
      ])
    })
}
