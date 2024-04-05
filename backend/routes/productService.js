const { Router } = require('express');
const { productModel } = require('../models/product');
const { Types } = require('mongoose');
const multer = require('multer');

const productRouter = Router();
const upload = multer(); // Define multer middleware

productRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      desc,
      category_id,
      is_featured,
      is_recent,
      price,
      discount,
      rating,
      rating_count,
    } = req.body;
    const image = {
      data: req.file.buffer, // Buffer containing image data
      contentType: req.file.mimetype, // Content type of the image
    };

    image.dataString = Buffer.from(image.data).toString('base64');

    const newProduct = new productModel({
      name,
      image,
      desc,
      category_id,
      is_featured,
      is_recent,
      price,
      discount,
      rating,
      rating_count,
    });

    await newProduct.save();

    res.status(201).send('Product created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to add product');
  }
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send('Failed to get products');
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const productId = new Types.ObjectId(req.params.id);
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).send('Product Not Found');
    // Send the product data including the image data
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(404).send('Product Not Found');
  }
});

productRouter.delete('/', async (req, res) => {
  try {
    await productModel.deleteMany({});
    res.status(200).send('All Products Deleted');
  } catch (error) {
    res.status(500).send('Failed to deleted products');
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.status(200).send('Product Updated');
  } catch (error) {
    res.status(500).send('Failed to update product');
  }
});

productRouter.get('/search/:word', async (req, res) => {
  try {
    const { word } = req.params;
    // case insensitive matching (matches with both uppercase and lower case)
    let regex = '';
    if (word) {
      regex = new RegExp(word, 'i');
    }

    // Query MongoDB using Mongoose
    const results = await productModel.find({ name: { $regex: regex } });
    res.status(200).json(results);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

console.log('[ROUTER] Loaded api/products route');
module.exports = productRouter;
