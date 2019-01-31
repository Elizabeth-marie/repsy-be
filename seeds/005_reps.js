
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reps').del()
    .then(function () {
      // Inserts seed entries
      return knex('reps').insert([
        { id: 1, fname: 'Peter', lname: 'Smith', company: 'AMGEN', credentials: 'Lorem ipsum dolor sit amet. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', city: 'Denver', state: 'Colorado', zip: '80014', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', email: 'Peter.Smith@gmail.com', password: '1234'},
        { id: 2, fname: 'Jack', lname: 'Kevorkian', company: 'entrepreneur', credentials: 'Pathologist', city: 'Pontiac', state: 'Michigan', zip: '48302', email: 'Jack.Kevorkian@gmail.com', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', password: '1234', reps_photo: 'https://static01.nyt.com/images/2011/06/04/us/jpKEVORKIAN1-obit/jpKEVORKIAN1-obit-jumbo.jpg' },
        { id: 3, fname: 'John', lname: 'Adams', company: 'Pfizer', credentials: 'Founding Father', city: 'Braintree', state: 'Massachusetts', zip: '02184', timekitId: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699', email: 'John.Adams@gmail.com', password: '1234', reps_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/John_Adams%2C_Gilbert_Stuart%2C_c1800_1815.jpg/800px-John_Adams%2C_Gilbert_Stuart%2C_c1800_1815.jpg' },
      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('reps_id_seq', (SELECT MAX(id) FROM reps))`)
    })
}
