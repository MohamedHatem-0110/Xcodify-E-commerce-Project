const {
  userService,
  productService,
  categoryService,
  orderService,
} = require("./routes");

module.exports.loadRoutes = async function loadRoutes(app) {
  await app
    .use("/api/auth", userService)
    .use("/api/products", productService)
    .use("/api/categories", categoryService)
    .use("/api/orders", orderService);
};
