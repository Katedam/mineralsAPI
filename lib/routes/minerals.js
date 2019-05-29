const Mineral = require('../models/Mineral');
const { Router } = require('express');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { mineral, description, images } = req.body;

    Mineral.create({ 
      mineral, 
      description, 
      images 
    })
      .then(createdMineral => res.send(createdMineral))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const query = {};
    const { search } = req.query;
    if(search) {
      query.quote = {
        $regex: new RegExp(search, 'i')
      };
    }

    Mineral.find(query)
      .select({ __v: false, _id: false })
      .then(minerals => res.send(minerals))
      .catch(next);
  })

  .get('/:mineral', (req, res, next) => {
    const mineral = req.params.mineral;

    Mineral.find({ mineral })
      .select({ __v: false, _id: false })
      .then(mineral => res.send(mineral[0]))
      .catch(next);
  });
