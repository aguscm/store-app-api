import express from "express";


module.exports = function (app: express.Application) {
  app.use("/products", require("../modules/products/routes"));
  app.use("/users", require("../modules/users/routes"));
  app.use("/cart", require("../modules/cart/routes"));
}