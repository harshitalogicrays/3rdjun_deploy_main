import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchCars, selectCars } from '../../redux/carSlice'
import { Link } from 'react-router-dom'

const ViewCars = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCars())
  },[])
  const cars = useSelector(selectCars)

  let handleDelete=async(id)=>{
    if(window.confirm("are you sure to delete this??")){
      try{
        await axios.delete(`${import.meta.env.VITE_URL}/cars/${id}`)
        toast.success("car deleted")
        getCars()
      }
      catch(err){toast.error(err.message)}
    }
  }
  return (
    <div className='container-fluid shadow p-3'>
        <h1 className='text-center'>Cars</h1><hr/>
      <div class="table-responsive"  >
        <table class="table table-bordered table-striped"   >
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Model</th>
              <th>Image</th>
              <th>Fuel Type</th>
              <th scope="col">Rent Price</th>
              <th>Capacity</th>
              <th>Location</th><th>Availablity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length==0 && <tr><td colSpan={8} className='text-center'>No Car Found</td></tr>}
            {cars.map((car,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{car.model}</td>
                <td><img src={car.image} width={50} height={50}/></td>
                <td scope="row">{car.fuel}</td>
                <td>{car.price}</td>
                <td>{car.capcity} Seater</td>
                <td>{car.location}</td>
                <td>{car.availability ? <span class="badge rounded-pill text-bg-success"
                  >Available</span> :<span class="badge rounded-pill text-bg-danger"
                  > Not Available</span>}</td>
                <td>
                  <Link type="button" class="btn btn-success me-2" to={`/admin/editcar/${car.id}`} > <BsPen/> </Link>
                  <button type="button" class="btn btn-danger" onClick={()=>handleDelete(car.id)} > <BsTrash/> </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewCars
