const { Schema, model } = require('mongoose');
const { generateObjectFromSchemaPaths } = require('../util/generalUtil');
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productCount: {
    type: Number,
    required: true,
  },
});

module.exports = {
  categoryModel: model('Categories', categorySchema),
  categoryObject: generateObjectFromSchemaPaths(categorySchema.paths),
};
