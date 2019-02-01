const express = require('express')
const router = express.Router()
const knex = require('../knex')
const Joi = require('joi')

/* Validates the user's ID */
const validatedoctors_conditionsID = (req, res, next) => {
  knex('doctors_conditions').where('id', req.params.id).then(([data]) => {
    console.log(data)
    if (!data) {
      return res.status(400).json({
        error: {
          message: `doctors_conditions ID ${req.params.id} not found`
        }
      })
    }
    next()
  })
}

// /* Uses joi to validate data types */
const validatePostBody = (req, res, next) => {
  const postSchema = Joi.object().keys({
    doctors_id: Joi.number().integer().required(),
    conditions_id: Joi.number().integer().required(),
  })

  const { error } = Joi.validate(req.body, postSchema)
  if (error) {
    return res.status(400).json({ "POST Schema Error": { message: error.details[0].message } })
  }
  next()
}
//
// /* Uses joi to build a patch request */
const buildPatchReq = (req, res, next) => {
  const patchSchema = Joi.object().keys({
    doctors_id: Joi.number().integer().required(),
    conditions_id: Joi.number().integer().required(),
  })

  const { error } = Joi.validate(req.body, patchSchema)
  if (error) {
    return res.status(400).json({ "PATCH Schema Error": { message: error.details[0].message } })
  }

  const allowedPatchKeys = ['conditions_id', 'doctors_id']

  // Constructs the patch request object
  let patchReq = {}
  allowedPatchKeys.forEach(key => {
    if (req.body.hasOwnProperty(key)) {
      patchReq[key] = req.body[key]
    }
  })

  // If the patch request is empty or has invalid key names, return an error
  if (Object.keys(patchReq).length === 0) {
    return res.status(400).json({ error: { message: `Empty or invalid patch request` } })
  }

  // Every patch update will create a new 'updated_at' timestamp
  patchReq.updated_at = new Date()

  // Stores the patch request-object into next request
  req.patchReq = patchReq
  next()
}
//
/* GET all users record */
router.get('/', (req, res, next) => {
  knex('doctors_conditions').then(data => res.status(200).json(data)).catch(err => next(err))
})
//
/* GET all conditions for a particular doctor ID
*/
router.get('/:id', (req, res, next) => {
  knex
    .select('doctors_conditions.id as join_id', 'doctors.lname', 'doctors.fname', 'conditions.name', 'conditions.id', 'conditions.specialties_id')
    .from('doctors_conditions')
    .innerJoin('doctors', 'doctors.id', 'doctors_conditions.doctors_id')
    .innerJoin('conditions', 'conditions.id', 'doctors_conditions.conditions_id')
    .where('doctors.id', req.params.id)
    .then(data => res.status(200).json(data)).catch(err => next(err))
})
//
// /* POST new users record */
//http post http://localhost:3000/doctors_conditions doctors_id=1 conditions_id=15
router.post('/', validatePostBody, (req, res, next) => {
  const {join_id, doctors_id, conditions_id} = req.body

  knex('doctors_conditions').insert({conditions_id, doctors_id}).returning('*').then(([data]) => res.status(201).json(data)).catch(err => next(err))
})
//
// /* PATCH specified users record */
//http patch http://localhost:3000/doctors_conditions/1 name='leg Cancer' specialties_id=1
router.patch('/:id', validatedoctors_conditionsID, buildPatchReq, (req, res, next) => {
  const {patchReq} = req

  knex('doctors_conditions')
  .where('id', req.params.id)
  .first()
  .update(patchReq)
  .returning('*')
  .then(([data]) => {
    res.status(200).json(data)
  }).catch(err => next(err))
})
//
// /* DELETE specified users record */
// http delete  http://localhost:3000/doctors_conditions/2
// id is the unique id of the join table reference
router.delete('/:id', validatedoctors_conditionsID, (req, res, next) => {
  knex('doctors_conditions').where('id', req.params.id).first().del().returning('*').then(([data]) => {
    console.log('deleted', data)
    res.status(200).json({deleted: data})
  })
})

module.exports = router
