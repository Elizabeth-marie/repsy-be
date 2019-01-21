const express = require('express')
const router = express.Router()
const knex = require('../knex')
const Joi = require('joi')

/* Validates the doctor's ID */
const validateUserID = (req, res, next) => {
  knex('doctors').where('id', req.params.id).then(([data]) => {
    console.log(data)
    if (!data) {
      return res.status(400).json({
        error: {
          message: `User ID ${req.params.id} not found`
        }
      })
    }
    next()
  })
}

// /* Uses joi to validate data types */
const validatePostBody = (req, res, next) => {
  const postSchema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    specialties_id: Joi.number().integer(),
    npi_num: Joi.string().required(),
    clinic_name: Joi.string(),
    clinic_address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number().integer().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string()
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
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    specialties_id: Joi.number().integer(),
    npi_num: Joi.string().required(),
    clinic_name: Joi.string(),
    clinic_address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number().integer().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string()
  })

  const { error } = Joi.validate(req.body, patchSchema)
  if (error) {
    return res.status(400).json({ "PATCH Schema Error": { message: error.details[0].message } })
  }

  const allowedPatchKeys = ['fname', 'lname', 'specialty_id', 'npi_num', 'clinic_name', 'clinic_address', 'city', 'state', 'zip', 'email', 'password', 'photo']

  // Constructs the patch request object
  let patchReq = {}
  allowedPatchKeys.forEach(key => {
    if (req.body.hasOwnProperty(key)) { patchReq[key] = req.body[key] }
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
/* GET all doctors record */
router.get('/', (req, res, next) => {
  knex('doctors').then(data => res.status(200).json(data)).catch(err => next(err))
})
//
/* GET single doctors record */
router.get('/:id', validateUserID, (req, res, next) => {
  knex('doctors').where('id', req.params.id).then(([data]) => res.status(200).json(data)).catch(err => next(err))
})
//
// /* POST new doctors record */
router.post('/', validatePostBody, (req, res, next) => {
  // const {id, fname, lname, specialty_id, npi_num, clinic_name, clinic_address, city, state, zip, email, password, photo} = req.body

  knex('doctors')
  .insert({
    'id': req.body.id,
    'fname': req.body.fname,
    'lname': req.body.lname,
    'specialties_id': req.body.specialties_id,
    'npi_num': req.body.npi_num,
    'clinic_name': req.body.clinic_name,
    'clinic_address': req.body.clinic_address,
    'city': req.body.city,
    'state': req.body.state,
    'zip': req.body.zip,
    'email': req.body.email,
    'password': req.body.password,
    'photo': req.body.photo
  })
    .returning('*')
    .then(([data]) => res.status(201).json(data)).catch(err => next(err))
})

/* PATCH specified doctors record */
router.patch('/:id', validateUserID, buildPatchReq, (req, res, next) => {
  const {patchReq} = req

  knex('doctors').where('id', req.params.id).first().update(patchReq).returning('*').then(([data]) => {
    res.status(200).json(data)
  }).catch(err => next(err))
})


/* DELETE specified doctors record */
router.delete('/:id', validateUserID, (req, res, next) => {
  knex('doctors').where('id', req.params.id).first().del().returning('*').then(([data]) => {
    console.log('deleted', data)
    res.status(200).json({deleted: data})
  })
})

module.exports = router
