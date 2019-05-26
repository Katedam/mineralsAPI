const Mineral = require('../models/Mineral');
const { Router } = require('express');

module.exports = Router()

  .get('/', (req, res, next) => {

    Mineral.find()
      .select({__v: false, _id: false})
      .then(minerals => res.send(minerals))
      .catch(next)
  })

  .get('/:mineral', (req, res, next) => {
    const mineral = req.params.mineral;
    
    Mineral.find({ mineral })
      .select({__v: false, _id: false})
      .then(mineral => res.send(mineral[0]))
      .catch(next)
  });
