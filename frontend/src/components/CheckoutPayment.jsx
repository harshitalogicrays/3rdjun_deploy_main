import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import { selectRentalInfo } from '../redux/rentalSlice';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51MWzILSJqCDJ3ZovShOg1ilq2hxwZLPytjDlf4Y8sK7c3tdyVqTvSkvMElvXsUZ7yteLaiyp7FqdlSMLMfjX5sMz00ThusY7s3");


const CheckoutPayment = () => {
  const [clientSecret, setClientSecret] = useState("");

  const rental = useSelector(selectRentalInfo)
  useEffect(() => {
    console.log("checkoutlpayment useEffect")
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: rental.totalPrice,address1:rental.address,
        name:rental.name, pincode:rental.pincode,line2:rental.apartment,
        phone:rental.phone
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const appearance = {
    theme: 'stripe',
  };

  const loader = 'auto';
  return (
    <div>
       {clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
              <CheckoutForm/>
          </Elements>
)}
    </div>
  )
}

export default CheckoutPayment
