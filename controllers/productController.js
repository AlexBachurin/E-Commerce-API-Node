const { BadRequestError } = require("../errors");
const ProductModel = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const createProduct = async (req, res) => {
  //attach user to req.body, since we have user property in Product Model
  //we get it from req.user from authentication middleware
  req.body.user = req.user.userId;
  //create product and send it back
  const product = await ProductModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findOne({ _id: productId });
  if (!product) {
    throw new BadRequestError(`No product with id of: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new BadRequestError(`No product with id of: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findOneAndDelete({
    _id: productId,
  });
  if (!product) {
    throw new BadRequestError(`No product with id of: ${productId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Product deleted from the list" });
};

const uploadImage = async (req, res) => {
  console.log(req.files);
  //   if no file provided throw error
  if (!req.files) {
    throw new BadRequestError("No File Provided");
  }
  // check if file is image
  const productImg = req.files.image;
  if (!productImg.mimetype.startsWith("image")) {
    throw new BadRequestError("File should be image type");
  }
  //   check for size
  const maxSize = 1024 * 1024;
  if (productImg.size > maxSize) {
    throw new BadRequestError(`Please upload image smaller than 1MB`);
  }
  //  construct path
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImg.name}`
  );
  // move image to our path
  await productImg.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImg.name}` });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
