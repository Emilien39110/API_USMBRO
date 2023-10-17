const mongoose = require('mongoose');
//const db = require('../config/db');


const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  filiere: String,
  token: String,
});

module.exports = mongoose.model('User', userSchema);