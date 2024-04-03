const { Schema, model } = require("mongoose");
const { generateObjectFromSchemaPaths } = require("../util/generalUtil");

const categorySchema = new Schema({
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
  productCount: {
    type: Number,
    required: true,
  },
});

module.exports = {
  categoryModel: model("Categories", categorySchema),
};
