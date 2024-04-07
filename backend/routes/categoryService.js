const { Router } = require("express");
const { categoryModel } = require("../models/category");

const multer = require("multer");
const categoryRouter = Router();

const upload = multer(); // Define multer middleware

console.log("[ROUTER] Loaded api/categories route");

categoryRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, productCount } = req.body;
    const image = {
      data: req.file.buffer, // Buffer containing image data
      contentType: req.file.mimetype, // Content type of the image
    };

    image.dataString = Buffer.from(image.data).toString("base64");

    const category = new categoryModel({
      name,
      image,
      productCount,
    });

    await category.save();
    res.status(201).send("Category Created");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

categoryRouter.get("/get", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    const categoriesSubset = categories.map(({ _id, name }) => ({ _id, name }));
    res.status(200).send(categoriesSubset);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = categoryRouter;
