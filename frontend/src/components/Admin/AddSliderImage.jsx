 import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectsliders } from '../../redux/sliderSlice'

const AddSliderImage = () => {
    const {id}=useParams()

    const navigate = useNavigate()
    const [slider,setslider]=useState({title:'',desc:'',image:''})
    let [pic,setPic]=useState()
    let [picLoading,setPicLoading]=useState(false)

    //edit 
const allSliders = useSelector(selectsliders) //[]
const sliderEdit = allSliders.find(item=>item.id == id) //{}
useEffect(()=>{
    if(id){setslider({...sliderEdit})}
    else setslider({title:'',desc:'',image:''})
},[id])


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
               setslider({...slider,image:res.data.url})
               setPicLoading(false)
             }
             catch(error){
                 toast.error(error.message); setPicLoading(false)
             }
         }
       
     }
     let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
            if(!slider.title || !slider.image){
                toast.error("please fill fields")
            }
            else {
                try{
                   await axios.post(`${import.meta.env.VITE_URL}/sliders`,slider)
                   toast.success("slider added")
                    navigate('/admin/viewslider')
                }
                catch(error){
                    toast.error(error.message)
                }
            }
        }
        else {
            try{
                await axios.put(`${import.meta.env.VITE_URL}/sliders/${id}`,slider)
                toast.success("slider updated")
                 navigate('/admin/viewslider')
             }
             catch(error){
                 toast.error(error.message)
             }
        }
       
     }
  return (
    <div className='container mt-5 col-6'>
        <h1>{id? "Edit Images ":"Add Images"}</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="" class="form-label">Title</label>
                <input  type="text"   name="title"  class="form-control" value={slider.title}
                onChange={(e)=>setslider({...slider,title:e.target.value})}/>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Description</label>
                <textarea  name="desc"  class="form-control"  value={slider.desc}
                onChange={(e)=>setslider({...slider,desc:e.target.value})}></textarea>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Choose file</label>
                <input type="file" class="form-control" name="pic" accept='image/*'
                onChange={(e)=>handleImage(e.target.files[0])}/>
            </div>
            {id && <img src={slider.image} height={50} width={50} />}
            <div className="d-grid gap-2 mt-2">
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

export default AddSliderImage
