import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51P2pztC7Ubp9FVBKSfZX89zgHEdMHb5x7dIgbnaLxsFh0irmMPyRwd5cKrymRD4BryPNNIn826vtCSvUl2YXYVdC00OLFgo0pA"
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("/api/orders/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((data) => {
        setClientSecret(data.data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
