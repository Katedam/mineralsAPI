require('dotenv').config();
require('./lib/utils/connect')();
const fetchMinerals = require('./lib/services/scrapeMinerals');
const Mineral = require('./lib/models/Mineral');
const mongoose = require('mongoose');

fetchMinerals()
  .then(minerals => Mineral.create(minerals))
  .finally(() => mongoose.connection.close());
