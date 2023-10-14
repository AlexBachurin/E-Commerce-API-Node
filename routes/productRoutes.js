const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const productRouter = express.Router();

productRouter.get("/", authenticateUser, getAllProducts);
productRouter.get("/:id", authenticateUser, getSingleProduct);
productRouter.post(
  "/",
  authenticateUser,
  authorizePermissions("admin"),
  createProduct
);
productRouter.patch(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateProduct
);
productRouter.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteProduct
);
productRouter.post(
  "/uploadImage",
  authenticateUser,
  authorizePermissions("admin"),
  uploadImage
);

module.exports = productRouter;
