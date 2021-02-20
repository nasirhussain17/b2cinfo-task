const Product = require("../models/Product");
module.exports =function () {

    return async(req,res,next)=>{
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit)
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      model = Product.find()
  
      if(startIndex > 0 ){
        results.previous = {
          page : page - 1,
          limit : limit
        }
      }
  
      if ( endIndex < await model.countDocuments().exec() ){
        results.next = {
          page : page + 1,
          limit : limit
        }
      }
      try {
        results.result = await Product.find({}).limit(limit).skip(startIndex).exec()
        console.log(results.result)
        res.paginatedResult = results;
        next();
      } catch (error) {
          res.status(500).json({message:error.message})
      }
    }
  }
