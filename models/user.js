const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String , require: true },
  password : {type: String, require: true},
  phone_number: { type: Number, require: true },
  position: { type: String},
  department : { type: String}
  
});

module.exports = mongoose.model("users", userSchema);
