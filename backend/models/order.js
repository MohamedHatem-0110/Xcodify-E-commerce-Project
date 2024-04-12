const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  order_date: {
    type: String,
  },
  items: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
});

module.exports = {
  orderModel: model("Orders", orderSchema),
};
