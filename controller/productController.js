const Product = require("../models/productModel");

const { getPostData } = require("../utils");

// @desc Get all products
//@route GET /api/products/
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

// @desc Get single product
//@route GET /api/product/:id
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc Create a products
//@route POST /api/products
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

// @desc Update a product
//@route PUT /api/products/:id
const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc Delete single product
//@route DELETE /api/product/:id
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
