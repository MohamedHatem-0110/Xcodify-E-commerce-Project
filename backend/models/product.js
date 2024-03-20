const { Schema, model } = require('mongoose');
const { generateObjectFromSchemaPaths } = require('../util/generalUtil');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  is_featured: {
    type: Boolean,
    required: true,
  },
  is_recent: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  rating_count: {
    type: Number,
    required: true,
  },
});

module.exports = {
  productModel: model('Products', productSchema),
  productObject: generateObjectFromSchemaPaths(productSchema.paths),
};
