import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: axios.defaults.baseURL,
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto"
    >
      <div className="bg-white shadow-md rounded px-4 py-6">
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          className="border border-gray-300 p-2 mb-4 rounded"
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLoading ? <div className="spinner"></div> : "Pay Now"}
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-red-500 mt-2">
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
