import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import UpdateBookingStatus from './UpdateBookingStatus'

const ViewBooking = () => {
    const location = useLocation()
    const car = location.state.details
    // console.log(location.state.details)
  return (
    <div className='container shadow mt-2 p-2'>
    <h1> Booking Details</h1><hr/>
    <div className='mb-3'>
      <Link to='/admin/bookings' className='btn btn-primary mb-2'>
          <FaArrowCircleLeft/>Back to Bookings 
      </Link>
    </div>
          {car == null ? 
          <>
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
          </>
          :<>
          
              <div className="row mb-3">
                <div className="col-4">
                <h4 className='text-info'>car Status : {car.status}</h4>
                <b>Shipping Address</b><br/>
              
              Address: {car.address},<br/>
              Apartment: {car.apartment}<br/>
              location:  {car.location}<br/>
              phone : {car.phone}<br/>
              pincode :{car.pincode}<br/>
              city: Ahmedabad
              <br/>
                </div>
                <div className="col">
                    <UpdateBookingStatus  id={car.id} status={car.status} car={car} />
                </div>
              </div>
           
              <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
        <th scope="col">ID</th>
              <th>CarId</th>
              <th scope="col">Model</th>
              <th>UserName</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>status</th>
        </tr>
      </thead>
      <tbody>
              <tr>
                <td scope="row">{car.id}</td>
                <td>{car.carId}</td>
                <td>{car.model}</td>
                <td>{car.name}</td>
                <td>{car.startDate}</td>
                <td>{car.endDate}</td>
                <td>{car.totalPrice}</td>
                <td>{car.status!="approved" ? <span
                    class="badge rounded-pill text-bg-danger">{car.status}</span>
                    :
                    <span
                    class="badge rounded-pill text-bg-success">{car.status}</span>
                }</td>
              </tr>

      </tbody> 
    </table>
  </div>
          </>
          }
  </div>
  )
}

export default ViewBooking
