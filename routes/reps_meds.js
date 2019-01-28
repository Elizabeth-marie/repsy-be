const express = require('express')
const router = express.Router()
const knex = require('../knex')
const Joi = require('joi')

/* Validates the user's ID */
const validateUserID = (req, res, next) => {
    knex('reps_meds').where('id', req.params.id).then(([data]) => {
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
        reps_id: Joi.number().integer().required(),
        meds_id: Joi.number().integer().required()
    })

    const { error } = Joi.validate(req.body, postSchema)

    if (error) {
        return res.status(400).json({ "POST Schema Error": { message: error.details[0].message } })
    }
    next()
}

/* Uses joi to build a patch request */
const buildPatchReq = (req, res, next) => {
    const patchSchema = Joi.object().keys({
        reps_id: Joi.number().integer().required(),
        meds_id: Joi.number().integer().required()
    })

    const { error } = Joi.validate(req.body, patchSchema)
    if (error) {
        return res.status(400).json({ "PATCH Schema Error": { message: error.details[0].message } })
    }

    const allowedPatchKeys = ['reps_id', 'meds_id']

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
GET all reps_meds record
http http://localhost:3000/reps_meds
*/
router.get('/', (req, res, next) => {
    knex('reps_meds').then(data => res.status(200).json(data)).catch(err => next(err))
})

/*
GET a list of reps for a particular med id
*/
router.get('/:id', (req, res, next) => {
  knex
    .select('reps.lname', 'reps.fname', 'reps.company', 'reps.id', 'reps.city', 'reps.state', 'reps.zip', 'reps.credentials', 'reps.reps_photo', 'reps.email',   'meds.generic_name', 'meds.brand_name', 'meds.pharma_company', 'meds.info', 'meds.meds_photo')
    .from('reps_meds')
    .innerJoin('meds', 'meds.id', 'reps_meds.meds_id')
    .innerJoin('reps', 'reps.id', 'reps_meds.reps_id')
    .where('meds.id', req.params.id)
    .then(data => res.status(200).json(data)).catch(err => next(err))
})

/*
POST new reps_meds record
http POST http://localhost:3000/reps_meds reps_id=2 meds_id=2
*/
router.post('/', validatePostBody, (req, res, next) => {
    const { id, reps_id, meds_id } = req.body

    knex('reps_meds').insert({ id, reps_id, meds_id }).returning('*').then(([data]) => res.status(201).json(data)).catch(err => next(err))
})

/*
PATCH specified reps_meds record
http PATCH http://localhost:3000/reps_meds/4 reps_id=3 meds_id=3
*/
router.patch('/:id', validateUserID, buildPatchReq, (req, res, next) => {
    const { patchReq } = req

    knex('reps_meds').where('id', req.params.id).first().update(patchReq).returning('*').then(([data]) => {
        res.status(200).json(data)
    }).catch(err => next(err))
})

/*
DELETE specified reps_meds record
http DELETE http://localhost:3000/reps_meds/4
*/
router.delete('/:id', validateUserID, (req, res, next) => {
    knex('reps_meds').where('id', req.params.id).first().del().returning('*').then(([data]) => {
        console.log('deleted', data)
        res.status(200).json({ deleted: data })
    })
})

module.exports = router
