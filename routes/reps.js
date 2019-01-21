const express = require('express')
const router = express.Router()
const knex = require('../knex')
const Joi = require('joi')

/* Validates the user's ID */
const validateUserID = (req, res, next) => {
  knex('reps').where('id', req.params.id).then(([data]) => {
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

/* Uses joi to validate data types */
const validatePostBody = (req, res, next) => {
  const postSchema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    company: Joi.string().required(),
    credentials: Joi.string().required(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string(),
  })

  const { error } = Joi.validate(req.body, postSchema)

  if (error) {
    return res.status(400).json({ "POST Schema Error": { message: error.details[0].message } })
  }
  next()
}

/* 

Uses joi to build a patch request 
http PATCH http://localhost:3000/reps/7 generic_name='hello' brand_name='hello'

*/
const buildPatchReq = (req, res, next) => {
  const patchSchema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    company: Joi.string().required(),
    credentials: Joi.string().required(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string(),
  })

  const { error } = Joi.validate(req.body, patchSchema)
  if (error) {
    return res.status(400).json({ "PATCH Schema Error": { message: error.details[0].message } })
  }

  const allowedPatchKeys = [ 'fname', 'lname', 'company', 'credentials', 'city', 'state', 'zip', 'email', 'password', 'photo']

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

/* 
GET all users record
http http://localhost:3000/reps
*/
router.get('/', (req, res, next) => {
  knex('reps').then(data => res.status(200).json(data)).catch(err => next(err))
})


/* 
GET single users record 
http http://localhost:3000/reps/3
*/
router.get('/:id', validateUserID, (req, res, next) => {
  knex('reps').where('id', req.params.id).then(([data]) => res.status(200).json(data)).catch(err => next(err))
})

/*
POST new users record
http POST http://localhost:3000/reps fname='Richard' lname='Hendrix' company='Pied Piper' credentials='nothing important' city='Palo Alto' state='California' zip='94020' email='Richard.Hendrix@gmail.com' password='1234' photo='good picture'
*/
router.post('/', validatePostBody, (req, res, next) => {
  const { id, fname, lname, company, credentials, city, state, zip, email, password, photo } = req.body

  knex('reps').insert({ id, fname, lname, company, credentials, city, state, zip, email, password, photo }).returning('*').then(([data]) => res.status(201).json(data)).catch(err => next(err))
})

/*
PATCH specified users record
http PATCH http://localhost:3000/reps/4 fname='Richard' lname='Hendrix' company='Pied Piper' credentials='nothing important' city='Palo Alto' state='California' zip='94020' email='Richard.Hendrix@gmail.com' password='1234' photo='good picture'
*/
router.patch('/:id', validateUserID, buildPatchReq, (req, res, next) => {
  const {patchReq} = req

  knex('reps').where('id', req.params.id).first().update(patchReq).returning('*').then(([data]) => {
    res.status(200).json(data)
  }).catch(err => next(err))
})

/*
DELETE specified users record
http DELETE http://localhost:3000/reps/4
*/
router.delete('/:id', validateUserID, (req, res, next) => {
  knex('reps').where('id', req.params.id).first().del().returning('*').then(([data]) => {
    console.log('deleted', data)
    res.status(200).json({deleted: data})
  })
})

module.exports = router
