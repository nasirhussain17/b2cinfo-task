const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  brand_name: {
    type: String,
    required: true,
  },
  brand_image: {
    data: Buffer,
    contentType: String
},
  isDeleted:{
    type:Number,
    default:0
},
});

module.exports = mongoose.model("brand", BrandSchema);