
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reps').del()
    .then(function () {
      // Inserts seed entries
      return knex('reps').insert([
        { id: 1, fname: 'Samantha', lname: 'Griffin', company: 'Genentech', credentials: `B.S. in Marketing & Communications from Cornell University. 9 years' tenure at Genentech with 7 years' experience as an Oncology Sales Representative`, city: 'Auora', state: 'Colorado', zip: '80012', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', email: 'sgriffin@genentech.com', password: 'password', reps_photo: 'https://www.organicheadshots.com/images/headshot06-thumb.jpg'},
        { id: 2, fname: 'Virginia', lname: 'Sullivan', company: 'Genetech', credentials: `B.S. in Molecular Biology from Ohio State University. 3 years tenure at Genentech with 5 years' experience as an Oncolog Sales Representative` , city: 'Centenntial', state: 'CO', zip: '80015', email: 'vsullivan@gmail.com', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', password: 'password', reps_photo: 'http://www.carmelstudiosphotography.com/wp-content/gallery/professional-headshots/Professional-Headshot-5.jpg' },
        { id: 3, fname: 'Jason', lname: 'Howard', company: 'Genetech', credentials: `B.S. in Biology from Stanford University. 10 years' tenure at Genentech. 5 years' experience as a Senior Oncology Sales Representative.`, city: 'Boulder', state: 'Colorado', zip: '80302', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', email: 'jhoward@genentech.com', password: 'password', reps_photo: 'https://www.eikonphoto.com/wp-content/uploads/2018/01/dc-corporate-headshots.jpg' },
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('reps_id_seq', (SELECT MAX(id) FROM reps))`)
    })
}
