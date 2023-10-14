const ProductModel = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = (req, res) => {
  res.send("get all products");
};

const createProduct = async (req, res) => {
  //attach user to req.body, since we have user property in Product Model
  //we get it from req.user from authentication middleware
  req.body.user = req.user.userId;
  //create product and send it back
  const product = await ProductModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getSingleProduct = (req, res) => {
  res.send("get single product");
};

const updateProduct = (req, res) => {
  res.send("update product");
};

const deleteProduct = (req, res) => {
  res.send("delete Product");
};

const uploadImage = (req, res) => {
  res.send("upload image");
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
