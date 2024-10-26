import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Slider = () => {
    const [sliders,setSliders]=useState([])
    useEffect(()=>{  getSliders() },[])
    
    const getSliders=async()=>{
      try{
         let res =  await axios.get(`${import.meta.env.VITE_URL}/sliders`)
         setSliders(res.data)
         console.log(res.data)
      }
      catch(err){toast.error(err.message)}
    }
  return (
    <>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
      <div class="carousel-inner">
        {sliders.map((s,i)=>
        <div class={`carousel-item ${i==0?"active":''}`} data-bs-interval="2000">
          <img src={s.image} class="d-block w-100" alt={s.title} height={400}/>
          <div class="carousel-caption d-none d-md-block">
            <h5>{s.title}</h5>
            <p>{s.desc}</p>
          </div>
        </div>
        )}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    </>
  )
}

export default Slider
