const { Router } = require("express");
const { orderModel } = require("../models/order");
const orderRouter = Router();

console.log("[ROUTER] Loaded api/orders route");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

orderRouter.post("/create-payment-intent", async (req, res) => {
  try {
    // Extract items and totalPrice from req.body
    const { items, totalPrice } = req.body;
    console.log(req);

    // Ensure both items and totalPrice are present
    if (!items || !totalPrice) {
      throw new Error("Items or totalPrice missing in the request body.");
    }

    // Log the received data to ensure it's correct
    console.log("Received items:", items);
    console.log("Received totalPrice:", totalPrice);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Send the client secret back to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Handle any errors that occur during payment intent creation
    console.error("Error creating PaymentIntent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the PaymentIntent." });
  }
});

orderRouter.post("/", async (req, res) => {
  try {
    const { user_id, items, total_price } = req.body;

    const order_date = new Date();

    const order = await orderModel.create({
      user_id,
      items,
      total_price,
      order_date,
    });

    res.status(200).send("Order is Placed");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

orderRouter.get("/byId/:user_id", async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user_id: req.params.user_id })
      .sort({ _id: -1 });
    // console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).json({ error: "User Not Found" });
  }
});

module.exports = orderRouter;
