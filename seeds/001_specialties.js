
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('specialties').del()
    .then(function () {
      // Inserts seed entries
      return knex('specialties').insert([
        { id: 1, name: 'Oncology' },
        { id: 2, name: 'Ophthalmology' },
        { id: 3, name: 'Dermatology' },
        { id: 4, name: 'Neurology' },
        { id: 5, name: 'Pathology' },
        { id: 6, name: 'Radiology' },
        { id: 7, name: 'Anesthesiology' },
        { id: 8, name: 'Psychiatry' },
        { id: 9, name: 'Pediatrics' },
        { id: 10, name: 'Cardiology' },
        { id: 11, name: 'Ob/Gyn' },
        { id: 12, name: 'Endocrinology' },
        { id: 13, name: 'Physiology' },
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('specialties_id_seq', (SELECT MAX(id) FROM specialties))`)
    })
}
