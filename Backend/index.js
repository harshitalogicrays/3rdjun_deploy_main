//express - nodejs webframework 
//cors 
//stripe 

import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SK)

const app  =  express()
app.use(express.json())
app.use(cors())
//http://localhost:4000
app.get('/',(req,res)=>{
    res.send("hello from nodejs server")
})

  //http://localhost:4000/create-payment-intent - post request
  app.post("/create-payment-intent", async (req, res) => {
    const { amount,address1,name,pincode ,line2,phone} = req.body;
    console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount*100, 
      currency: "inr",
      description:"description",
      shipping:{
        address:{
            line1:address1,
            line2:line2,
            city:'ahmedabad',
            state:'gujrat',
            postal_code:pincode,
            country:'india'},
        name:name,
        phone:phone
        },
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: `${process.env.USER}`,
      pass: `${process.env.PASS}`,
    },
  });

app.post('/mail',async(req,res)=>{
  const {userEmail,userName,status,amount,startDate,endDate} = req.body
  try{
    const info = await transporter.sendMail({
      from: `"Admin 👻"${process.env.USER}`, // sender address
      to: userEmail, // list of receivers
      subject: "Booking Details", // Subject line
      html: `Hello <b>${userName}</b><br/><b>Thank you for booking a car on rent from us </b>
      <br> Amount = ${amount}<br/>
      Order Status : ${status}<br/>
      Start Date: ${startDate}<br/>
      End Date: ${endDate}<br/>
      Payment:online<br/>
      Thank You<br/>Admin `, // html body
});
res.send({'message':'Mail Sent'}) }
  catch(err){console.log(err)} 
})


let PORT = process.env.PORT || 2000
app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})
