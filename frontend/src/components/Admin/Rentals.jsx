import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Rentals = () => {
    const [rentals,setRentals]=useState([])
    useEffect(()=>{
        getRentals()
    },[])
    
    const getRentals=async()=>{
      try{
         let res =  await axios.get(`${import.meta.env.VITE_URL}/rentals`)
         setRentals(res.data)
      }
      catch(err){toast.error(err.message)}
    }
  return (
  <div className='container-fluid shadow p-3'>
        <h1 className='text-center'>Rental Cars</h1><hr/>
      <div class="table-responsive"  >
        <table class="table table-bordered table-striped"   >
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Model</th>
              <th>UserId</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rentals.length==0 && <tr><td colSpan={6} className='text-center'>No Car Found for rental</td></tr>}
            {rentals.map((rent,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{rent.model}</td>
                <td>{rent.userId}</td>
                <td>{rent.startDate}</td>
                <td>{rent.endDate}</td>
                <td>{rent.totalPrice}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Rentals
