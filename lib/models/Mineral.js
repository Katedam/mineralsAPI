const mongoose = require('mongoose');

const mineralSchema = new mongoose.Schema({
  mineral: String,
  description: String,
  images: Array
});

module.exports = mongoose.model('Mineral', mineralSchema);
