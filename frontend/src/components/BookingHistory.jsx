import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectId } from '../redux/authSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const BookingHistory = () => {
    const [booking,setBooking]=useState([])
    const userId = useSelector(selectId)
    useEffect(()=>{
        getBookingsDetails()
    },[])
    
    const getBookingsDetails=async()=>{
      try{
         let res =  await axios.get(`${import.meta.env.VITE_URL}/bookings?userId=${userId}`)
         setBooking(res.data)
      }
      catch(err){toast.error(err.message)}
    }

    const handleComplete=async(car)=>{
        // console.log(details)
        try{
            await axios.put(`${import.meta.env.VITE_URL}/bookings/${car.id}`,{...car,status:'completed'})
            let res  = await axios.get(`${import.meta.env.VITE_URL}/cars/${car.carId}`)
            await axios.put(`${import.meta.env.VITE_URL}/cars/${car.carId}`,{...res.data,availability:true})
            Navigate('/history')
        }
      catch(err){
        toast.error(err.message)
      }
    }
  return (
  <div className='container-fluid shadow p-3'>
        <h1 className='text-center'>Bookings History</h1><hr/>
      <div class="table-responsive"  >
        <table class="table table-bordered table-striped"   >
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th>CarId</th>
              <th scope="col">Model</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>status</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {booking.length==0 && <tr><td colSpan={8} className='text-center'>No Car Found for Booking</td></tr>}
            {booking.map((rent,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{rent.carId}</td>
                <td>{rent.model}</td>
                <td>{new Date(rent.startDate).toLocaleDateString()}</td>
                <td>{new Date(rent.endDate).toLocaleDateString()}</td>
                <td>{rent.totalPrice}</td>
                <td>{(rent.status!="approved"  && rent.status!="completed") ? <span
                    class="badge rounded-pill text-bg-danger">{rent.status}</span>
                    :
                    <span
                    class="badge rounded-pill text-bg-success">{rent.status}</span>
                }</td>
                <td>
                    <button type="button"  class="btn btn-primary" onClick={()=>handleComplete(rent)} disabled={rent.status=="completed"?'disabled':''}>
                        Completed
                    </button>
                    
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default BookingHistory
