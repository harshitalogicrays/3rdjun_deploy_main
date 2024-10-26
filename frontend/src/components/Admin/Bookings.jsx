import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Bookings = () => {
    const [booking,setBooking]=useState([])
    useEffect(()=>{
        getBookingsDetails()
    },[])
    
    const getBookingsDetails=async()=>{
      try{
         let res =  await axios.get(`${import.meta.env.VITE_URL}/bookings`)
         setBooking(res.data)
      }
      catch(err){toast.error(err.message)}
    }
  return (
  <div className='container-fluid shadow p-3'>
        <h1 className='text-center'>Bookings Details</h1><hr/>
      <div class="table-responsive"  >
        <table class="table table-bordered table-striped"   >
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th>CarId</th>
              <th scope="col">Model</th>
              <th>UserName</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {booking.length==0 && <tr><td colSpan={8} className='text-center'>No Car Found for Booking</td></tr>}
            {booking.map((rent,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{rent.carId}</td>
                <td>{rent.model}</td>
                <td>{rent.name}</td>
                <td>{rent.startDate}</td>
                <td>{rent.endDate}</td>
                <td>{rent.totalPrice}</td>
                <td>{rent.status!="approved" ? <span
                    class="badge rounded-pill text-bg-danger">{rent.status}</span>
                    :
                    <span
                    class="badge rounded-pill text-bg-success">{rent.status}</span>
                }</td>
                <td>
                    <Link type="button"class="btn btn-primary" to={`/admin/bookings/view/${rent.id}`} state={{ details: rent }} >
                        View 
                    </Link>
                    
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Bookings
