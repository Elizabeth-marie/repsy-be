const express = require('express')
const router = express.Router()
const knex = require('../knex')
const Joi = require('joi')

/* Validates the user's ID */
const validateConditionsID = (req, res, next) => {
  knex('conditions').where('id', req.params.id).then(([data]) => {
    console.log(data)
    if (!data) {
      return res.status(400).json({
        error: {
          message: `Condition ID ${req.params.id} not found`
        }
      })
    }
    next()
  })
}

// /* Uses joi to validate data types */
const validatePostBody = (req, res, next) => {
  const postSchema = Joi.object().keys({
    name: Joi.string().required(),
    specialties_id: Joi.number().integer().required(),
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
    name: Joi.string().required(),
    specialties_id: Joi.number().integer().required(),
  })

  const { error } = Joi.validate(req.body, patchSchema)
  if (error) {
    return res.status(400).json({ "PATCH Schema Error": { message: error.details[0].message } })
  }

  const allowedPatchKeys = ['name', 'specialties_id']

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
  knex('conditions').then(data => res.status(200).json(data)).catch(err => next(err))
})
//
/* GET single users record */
router.get('/:id', validateConditionsID, (req, res, next) => {
  knex('conditions').where('id', req.params.id).then(([data]) => res.status(200).json(data)).catch(err => next(err))
})
//
// /* POST new users record */
//http post http://localhost:3000/conditions name='Cancer Cancer' specialties_id=2
router.post('/', validatePostBody, (req, res, next) => {
  const {name, specialties_id} = req.body

  knex('conditions').insert({name, specialties_id}).returning('*').then(([data]) => res.status(201).json(data)).catch(err => next(err))
})
//
// /* PATCH specified users record */
//http patch http://localhost:3000/conditions/1 name='leg Cancer' specialties_id=1
router.patch('/:id', validateConditionsID, buildPatchReq, (req, res, next) => {
  const {patchReq} = req

  knex('conditions')
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
// http delete  http://localhost:3000/conditions/2
router.delete('/:id', validateConditionsID, (req, res, next) => {
  knex('conditions').where('id', req.params.id).first().del().returning('*').then(([data]) => {
    console.log('deleted', data)
    res.status(200).json({deleted: data})
  })
})

module.exports = router
