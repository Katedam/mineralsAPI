const Mineral = require('../models/Mineral');
const { Router } = require('express');

const normalizeParams = mineral => {
  return mineral.charAt(0).toUpperCase() + mineral.slice(1);
}

module.exports = Router()

  .get('/', (req, res, next) => {

    Mineral.find()
      .select({__v: false, _id: false})
      .then(minerals => res.send(minerals))
      .catch(next)
  })

  .get('/:mineral', async(req, res, next) => {
    const mineralQuery = normalizeParams(req.params.mineral);

    Mineral.find({ mineral: mineralQuery })
      .select({__v: false, _id: false})
      .then(mineral => res.send(mineral[0]))
      .catch(next)
  });
