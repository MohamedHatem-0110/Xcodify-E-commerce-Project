const { Schema, model } = require("mongoose");
const { generateObjectFromSchemaPaths } = require("../util/generalUtil");

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  sub_total_price: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  order_date: {
    type: String,
    required: true,
  },
  order_details: [
    {
      product_id: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  shipping_info: {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
  },
});

module.exports = {
  orderModel: model("Orders", orderSchema),
};
