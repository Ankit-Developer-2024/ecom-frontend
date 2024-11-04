import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../../Stripe.css";
import { useSelector } from "react-redux";
import { selectcurrentOrder } from "../../features/order/orderSlice";
import CheckoutForm from "../checkFormPage/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OInnWSDwjbP5yp8BY9DUmKBGC7WteAnddAOIBZTUXgWJMzfZ9tln4C8vMis5I5hPfQrNePdpTspdNQeB2aiOXYe00q1Y27y2T");

export default function StripeCheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder=useSelector(selectcurrentOrder) 

  console.log("curr",currentOrder);
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount, }),
      meta:{
        order_id: currentOrder.id 
        // this info will go to stripe => and then to our webhook
        // so we can conclude that payment was successful, even if client closes window after pay
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
 

  return (
     <>
      <div className="Stripe">
        {clientSecret && (
          <Elements options={{clientSecret, appearance}} stripe={stripePromise}>
             <CheckoutForm />
          </Elements>
        )}
      </div>
      </>
  );
}