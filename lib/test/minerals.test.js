require('dotenv').config();
require('../utils/connect')();
const Mineral = require('../models/Mineral');

const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');

describe('minerals routes', () => {

   const createMineral = (mineral = 'Quartz', description = 'perdy', images = ['animageUrl']) => {
    return Mineral.create({ mineral, description, images })
      .then(mineral => ({
        ...mineral, 
        _id: mineral.id.toString() 
      }));
  };

  afterAll(done => {
    mongoose.connection.close(() => done());
  });

  beforeEach(done => mongoose.connection.dropDatabase(() => done()))

  beforeEach(() => {
    return Promise.all(['feldspar', 'clays', 'limestone', 'copper', 'dolomite', 'cobalt', 'mica', 'manganese', 'zeolites'].map(mineral => createMineral(mineral)));
  });


  it('returns a list of minerals', () => {
    return request(app)
      .get('/minerals')
      .then(res => {
        expect(res.body).toHaveLength(9);
      });
  });

  it('returns a mineral by name', () => {
    return request(app)
      .get('/minerals/mica')
      .then(res => {
        expect(res.body).toEqual({
          mineral: 'mica',
          description: 'perdy',
          images: ['animageUrl']
        });
      });
  });

  it('posts a new mineral', () => {
    return request(app)
    .post('/minerals')
    .send({
      mineral: 'gold',
      description: 'It\'s shiny',
      images: ['one', 'two']
    })
    .then(res => {
      expect(res.body).toEqual({
      mineral: 'gold',
      description: 'It\'s shiny',
      images: ['one', 'two'],
      __v: 0,
      _id: expect.any(String)
      })
    })
  })

});
