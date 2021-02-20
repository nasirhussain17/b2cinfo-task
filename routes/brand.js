
const express = require("express");

const mongoose = require("mongoose");

const Product = require("../models/Product");
const Brand = require("../models/Brand");

const router = express.Router();

router.use(express.json({ extended: false }));


router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find()

    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/",  async (req, res) => {
  const {

   brand_name,
   brand_image
  } = req.body;

  // Build profile object
  const brand = {};
 
  if (brand_name) brand.brand_name = brand_name;
  if (brand_image) brand.brand_image = brand_image;
  try {
    

    // Create
    newBrand = new Brand(brand);

    await newBrand.save();
    res.json(newBrand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;