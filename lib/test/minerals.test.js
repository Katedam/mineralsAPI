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
    return Promise.all(['Feldspar', 'Clays', 'Limestone', 'Copper', 'Dolomite', 'Cobalt', 'Mica', 'Manganese', 'Zeolites'].map(mineral => createMineral(mineral)));
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
          mineral: 'Mica',
          description: 'perdy',
          images: ['animageUrl']
        });
      });
  });

});
