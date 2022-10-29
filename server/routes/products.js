// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   res.render('products/add', {title: 'Add a Product'})
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let newproduct = product({
    "Name": req.body.name,
    "Description": req.body.description,
    "Price": req.body.price    
});

//method of the product model
product.create(newproduct, (err, product) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // Redirect the user back to the productList page 
        res.redirect('/products');
    }
});
});

// GET the Product Details page in order to edit an existing Product
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;

   product.findById(id, (err, productsToUpdate) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           res.render('products/details', {title: 'Edit product', products: productsToUpdate})
       }
   });
 });

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id

   let updatedproducts = product({
       "_id": id,
       "Title": req.body.title,
     "Price": req.body.price,
     "Author": req.body.author,
     "Genre": req.body.genre     
   });
 
   //update method of the product model
   product.updateOne({_id: id}, updatedproducts, (err) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           // Redirect the user back to the productList page
           res.redirect('/products');
       }
   });
 
 });

// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let id = req.params.id;

   //Passing ID to the product's remove method
   product.remove({_id: id}, (err) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
            // Redirect the user back to the productList page
            res.redirect('/products');
       }
   });
 });
 

module.exports = router;
