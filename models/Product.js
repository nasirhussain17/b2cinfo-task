const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
  },
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  mrp_price: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String
},
  isDeleted:{
      type:Number,
  default:0
},
});

module.exports = mongoose.model("product", ProductSchema);