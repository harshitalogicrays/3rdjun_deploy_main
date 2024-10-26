import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectCars } from '../../redux/carSlice'
//image , model , price, fuel type, capcity
const AddCar = () => {
    const {id} =useParams() 
   
    const navigate=useNavigate()
    let [car,setCar]=useState({model:'',price:'',image:'',fuel:'',capcity:'',availability:'',location:''})
    const ahmedabadAreas = [
        "Satellite", "Bopal", "Navrangpura","SG Highway", "Paldi",
        "Vastrapur","Gota",  "Thaltej", "Maninagar",  "Naranpura",
        "Prahlad Nagar",  "Ambawadi",  "Vejalpur",  "Ellis Bridge",
        "Sarkhej",   "Memnagar", "Chandkheda",  "Bodakdev",
        "Shahibaug",  "Ranip"
    ];
    
    let [pic,setPic]=useState()
    let [picLoading,setPicLoading]=useState(false)

//edit 
const allcars = useSelector(selectCars) //[]
const carEdit = allcars.find(item=>item.id == id) //{}
useEffect(()=>{
    if(id){setCar({...carEdit, availability: carEdit.availability ? 'true': 'false'})}
    else setCar({model:'',price:'',image:'',fuel:'',capcity:'',availability:''})
},[id])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){ //add 
            if(!car.model || !car.price || !car.image || !car.fuel || !car.capcity || !car.availability){
                toast.error("please fill fields")
            }
            else {
                try{
                   await axios.post(`${import.meta.env.VITE_URL}/cars`,{...car,availability:car.availability=="true"?true:false})
                   toast.success("car added")
                    navigate('/admin/viewcar')
                }
                catch(error){
                    toast.error(error.message)
                }
            }
        }
        else { //update
            try{
                await axios.put(`${import.meta.env.VITE_URL}/cars/${id}`,{...car,availability:car.availability=="true"?true:false})
                toast.success("car details updated")
                 navigate('/admin/viewcar')
             }
             catch(error){
                 toast.error(error.message)
             }
        }
       
    }

    let handleImage=async(img)=>{
       setPicLoading(true)
        if(img==undefined){toast.error("please select an image")}
        if(img.type=="image/jpg" ||img.type=="image/jpeg" ||img.type=="image/png" ){
            const data = new FormData()
            data.append('file',img)
            data.append('upload_preset','carrental')
            data.append('cloud_name','harshitalogicrays1')
            try{
              let res  = await axios.post("https://api.cloudinary.com/v1_1/harshitalogicrays1/image/upload",data)
              console.log(res.data.url)
              setCar({...car,image:res.data.url})
              setPicLoading(false)
            }
            catch(error){
                toast.error(error.message)
                setPicLoading(false)
            }
        }
      
    }
  return (
   <div className='container col-9 bg-secondary text-white p-2'>
   <h1>{id ? "Edit ": "Add "} Car</h1>

    <form onSubmit={handleSubmit}>
        <div className="row">
        <div class="mb-3 col">
            <label for="" class="form-label">Model</label>
            <input type="text" name="model" class="form-control" 
            value={car.model} onChange={(e)=>setCar({...car,model:e.target.value})}/>
        </div>
        <div class="mb-3 col">
            <label for="" class="form-label">Price</label>
            <input type="number" name="price" class="form-control"   value={car.price} onChange={(e)=>setCar({...car,price:e.target.value})} />
        </div>
        </div>
       <div className="row">
        <div class="mb-3 col">
            <label for="" class="form-label">Fuel Type</label>
                <select class="form-select" name="fuel"  value={car.fuel} onChange={(e)=>setCar({...car,fuel:e.target.value})}>
                   <option selected disabled value=''>Select one</option>
                   <option>Petrol</option>
                   <option>Diesel</option>
                  <option>CNG</option>
                  <option>EV</option>
                </select>
        </div>
        <div class="mb-3 col">
            <label for="" class="form-label">Choose Location</label>
                <select class="form-select" name="location"  value={car.location} onChange={(e)=>setCar({...car,location:e.target.value})}>
                   <option selected disabled value=''>Select one</option>
                   {ahmedabadAreas.map((loc,i)=>
                   <option key={i}>{loc}</option>
                )}
                </select>
        </div>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Choose file</label>
            <input type="file" class="form-control" name="pic" accept='image/*'
            onChange={(e)=>handleImage(e.target.files[0])}/>
        </div>
        {id && <img src={car.image} height={50} width={50}/>}
        <div className="row">
        <div class="mb-3 col">
            <label for="" class="form-label">Capacity</label>
            <input type="number" name="capcity" class="form-control"  value={car.capcity} onChange={(e)=>setCar({...car,capcity:e.target.value})}  />
        </div>
        <div class="mb-3 col">
            <label for="" class="form-label">Availability</label>
            <select class="form-select" name="availability" value={car.availability}
            onChange={(e)=>setCar({...car,availability:e.target.value})}>
                <option value='' selected disabled>Choose </option>
               <option value="false">false</option>
                <option value="true">true</option>
            </select>
        </div>
        </div>
       
        
        <div className="d-grid gap-2">
        <button type="submit" class="btn btn-info"> 
                {picLoading ? <div class="text-center">
                <div class="spinner-border" role="status">
                </div>
                </div> :<> {id ? "Update" : "Submit"}</>}
             </button>
        </div>
    </form>
   </div>
  )
}

export default AddCar
