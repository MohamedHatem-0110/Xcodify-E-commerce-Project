const { Schema, model } = require("mongoose");
const { generateObjectFromSchemaPaths } = require("../util/generalUtil");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    dataString: {
      type: String,
    },
  },

  desc: {
    type: String,
  },
  category_id: {
    type: String,
  },
  is_featured: {
    type: Boolean,
  },
  is_recent: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  rating_count: {
    type: Number,
  },
});

module.exports = {
  productModel: model("Products", productSchema),
};
