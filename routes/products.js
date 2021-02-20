
const express = require("express");

const mongoose = require("mongoose");

const Product = require("../models/Product");
const Brand = require("../models/Brand");
var multer  = require('multer')
const paginatedData= require('../middleware/Pagination')

const router = express.Router();

router.use(express.json({ extended: false }));

// multer for uploading image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter});



// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).populate('brand',['brand_name']);

    res.json(products);
    console.log(products)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get products with paginatin
router.get('/paginated',paginatedData(), (req,res)=>{
      res.json(res.paginatedResult);

})

//filter product by name 
router.get('/filter',async (req,res)=>{
  const query = req.query.name;
  const result = await Product.find({name:query})
  res.json(result);
})
// posting a new product
router.post("/", async (req, res) => {
  const {

    name,
    sku,
    price,
    mrp_price,
    image,
  } = req.body;
  const brand = req.query.id;
  // Build profile object
  const products = {};
 
  if (name) products.name = name;
  if (sku) products.sku = sku;
  if (price)
    products.price = price;
  if (mrp_price)
    products.mrp_price = mrp_price;
  if(image) products.image = image;
  if(brand)products.brand = brand;
  try {
    

    // Create
    var product = new Product(products);
    console.log(product)
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//uploading image of the product 
router.post('/:id',upload.single('imageFile'), (req, res) => {
  const id = req.params.id;
  const img = req.file;
  const result  = Product.findByIdAndUpdate(id,{image:img})
  res.json(result);
})

module.exports = router;