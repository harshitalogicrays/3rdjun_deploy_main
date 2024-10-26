import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { STORE_RENTAL } from '../redux/rentalSlice';

const Checkout = () => {
  const location = useLocation();
  let rentalDetails = location.state ? location.state.rentalDetails :{}
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '', phone: '',  address: '',  apartment: '', area: '', pincode: '' })

  const handleChange = (e) => {
   setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value 
    }))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlePayment = (e) => {
    e.preventDefault()
    dispatch(STORE_RENTAL({...rentalDetails,...deliveryInfo}))
    navigate('/checkoutpayment')
  }

  return (
    <div className="container mt-4">
      <h2 className='text-center'>Checkout  Page</h2><hr/>
      {rentalDetails ? (
        <div className="row">
        <div className='col-4'>
          <h4>Rental Summary</h4>
          <p><strong>Model:{rentalDetails.model}</strong> </p>
          <p><strong>Location:{rentalDetails.location}</strong> </p>
          <p><strong>From:{new Date(rentalDetails.startDate).toLocaleDateString()}</strong> </p>
          <p><strong>To:{new Date(rentalDetails.endDate).toLocaleDateString()}</strong> </p>
          <p><strong>Duration: {Math.ceil((new Date(rentalDetails.endDate)-new Date(rentalDetails.startDate))/(1000*60*60*24))} days</strong> </p>
          <p><strong>Total Price: &#8377;{rentalDetails.totalPrice}</strong> </p>
    </div>
        <div className="col">
          <h4>Delivery Address</h4>
          <form onSubmit={handlePayment}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={deliveryInfo.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={deliveryInfo.phone}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={deliveryInfo.address}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apartment"
              value={deliveryInfo.apartment}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={deliveryInfo.area}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={deliveryInfo.pincode}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <button type="submit" className="btn btn-success" >Proceed to Pay</button>
          </form>
        </div>
        </div>
      ) : (
        <p>No rental details found.</p>
      )}
    </div>
  )
}

export default Checkout