import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateBookingStatus = ({id,status,car}) => {
    let [ostatus,setOStatus]=useState(status)
    const navigate=useNavigate()
    let handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.put(`${import.meta.env.VITE_URL}/bookings/${id}`,{...car,status:ostatus})
            sendMail(res.data)

            if(ostatus=="approved"){
              await updateCarAvailablity(false,car)
            }
            else if(ostatus=="completed"){
              await updateCarAvailablity(true,car)
            }

            toast.success("booking status updated")
            navigate('/admin/bookings')            

        }
        catch(error){
            toast.error(error.message)
        }
    }
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
    

      const updateCarAvailablity=async(flag,car)=>{
        try{
          let res  = await axios.get(`${import.meta.env.VITE_URL}/cars/${car.carId}`)
          await axios.put(`${import.meta.env.VITE_URL}/cars/${car.carId}`,{...res.data,availability:flag})
            toast.success(`${car.id} availability set to ${flag}`)
        }
      catch(err){
        toast.error(err.message)
      }
      }
  return (
    <div>
          <h3>Update Booking Status</h3><hr/>
          <form onSubmit={handleSubmit}>
            <div class="mb-3 col-6">
                <label for="" class="form-label">Status</label>
                <select class="form-select" value={ostatus} onChange={(e)=>setOStatus(e.target.value)} >
                    <option>pending</option>
                    <option>approved</option>
                    <option>cancelled</option>
                    <option>completed</option>
                </select>
                <button  type="submit"class="btn btn-primary mt-3"  > Update   </button>
                
                </div>
        </form>
    </div>
  )
}

export default UpdateBookingStatus
