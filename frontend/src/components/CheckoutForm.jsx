import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectRentalInfo } from '../redux/rentalSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { selectEmail } from '../redux/authSlice';

const CheckoutForm = () => {
  const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const rentalDetails = useSelector(selectRentalInfo)
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userEmail = useSelector(selectEmail)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {return;}
        setIsLoading(true);
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:5173/",
          },
          redirect:'if_required'
        }).then(async(res)=>{
          if(res.paymentIntent){
              if(res.paymentIntent.status=="succeeded"){
                try{
                  const res1 = await axios.post(`${import.meta.env.VITE_URL}/bookings`,{...rentalDetails,status:'pending',userEmail:userEmail})
                  console.log(res1.data)
                  const existing  =  await axios.get(`${import.meta.env.VITE_URL}/rentals?userId=${rentalDetails.userId}&carId=${rentalDetails.carId}&startDate=${new Date(rentalDetails.startDate).toISOString()}`)
                  const existingRental =  existing.data //[{}]
                  if(existingRental.length!=0){
                    await axios.delete(`${import.meta.env.VITE_URL}/rentals/${existingRental[0].id}`);
                  }
                  sendMail(res1.data)
                  toast.success("payment done")
                  toast.success("booking success")
                  navigate('/')
                }
                catch(err){toast.error(err.message)}
              }
            }
            if(res.error){toast.error(res.error.message) ;setMessage(res.error.message);return}
          
        })

        // 
        setIsLoading(false);
      };
    

      const sendMail = async(data)=>{
        let obj = {userEmail:data.userEmail,userName:data.name,status:data.status,amount:data.totalPrice,startDate:data.startDate,endDate:data.endDate}
        try{
          await fetch("http://localhost:4000/mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
          })
          toast.success("mail sent successfully")
        }
        catch(err){toast.err(err.message)}
      }

      const paymentElementOptions = { layout: "tabs" }
  return (
    <div className='container mt-5'>
        <div className="row">
            <div className="col">
                <h1>Rental Summary</h1>
                <p><strong>Model:{rentalDetails.model}</strong> </p>
                <p><strong>Location:{rentalDetails.location}</strong> </p>
                <p><strong>From:{new Date(rentalDetails.startDate).toLocaleDateString()}</strong> </p>
                <p><strong>To:{new Date(rentalDetails.endDate).toLocaleDateString()}</strong> </p>
                <p><strong>Duration: {Math.ceil((new Date(rentalDetails.endDate)-new Date(rentalDetails.startDate))/(1000*60*60*24))} days</strong> </p>
                <p><strong>Total Price: &#8377;{rentalDetails.totalPrice}</strong> </p>
            </div>
            <div className="col">
            <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <div class="d-grid gap-2 mt-3">
        <button className='btn btn-primary' disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
                {isLoading ? <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div> : "Pay now"}
            </span>
            </button>
        </div>
        
           
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            </form>
                </div>
            </div>
     
    </div>
  )
}

export default CheckoutForm
