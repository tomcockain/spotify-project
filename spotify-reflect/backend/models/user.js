const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  email: String,
  
});

module.exports = mongoose.model('User', userSchema);