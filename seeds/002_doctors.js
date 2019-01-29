exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {id: 1, fname: 'Harrison', lname: 'McDonald', specialties_id: 1, npi_num: '1111111111', clinic_name: 'Boulder Family Practice', clinic_address: '24 South Street', city: 'Boulder', state: 'CO', zip: 80303, email: 'doctorharry@gmail.com', pswd_hash: 'pswd', photo: ''},
        {id: 2, fname: 'Rebecca', lname: 'Jones', specialties_id: 1, npi_num: '2222222222' , clinic_name: 'Nantucket Medical Facility', clinic_address: '1589 Petunia Ave', city: 'Nantucket', state: 'MA', zip: 02554, email: 'rjones@gmail.com', pswd_hash: 'pswd_hash1', photo: ''},
        {id: 3, fname: 'Georgia', lname: 'Smith', specialties_id: 1, npi_num: '3333333333', clinic_name: 'Charleston Medical Clinic', clinic_address: '5779 Broad Street', city: 'Charleston', state: 'SC', zip: 29401, email: 'georgiasmith@gmail.com', pswd_hash: 'pswd_hash2', photo: ''},
        {id: 4, fname: 'Michael', lname: 'Connely', specialties_id: 3, npi_num: '4444444444', clinic_name: 'Holistic Family Practice', clinic_address: '1322 Snowflake Drive', city: 'Omaha', state: 'NE', zip: 78007, email: 'connely.michael@gmail.com', pswd_hash: 'pswd_hash3', photo: ''},
        {id: 5, fname: 'Ezra', lname: 'Stone', specialties_id: 8, npi_num: '5555555555', clinic_name: `Children's Hospital`, clinic_address: '4488 Main Street', city: 'Honolulu', state: 'HI', zip: 96804, email: 'ezra.stone@gmail.com', pswd_hash: 'pswd_hash4', photo: ''}
      ])
      .then(function() { return knex.raw("SELECT setval('doctors_id_seq', (SELECT MAX(id) FROM doctors))")
      })
    })
  }
