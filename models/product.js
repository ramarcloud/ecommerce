const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: String,
  generic_name : String,
  invoice_no: String ,
  quantity :  Number,
  amount : Number,
  exp_date: String, 
  rack:  String,
  column :  String
});

module.exports = mongoose.model("product", productSchema);
