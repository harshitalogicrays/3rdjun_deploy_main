import React, { useEffect } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { selectsliders, STORE_SLIDERS } from '../../redux/sliderSlice'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ViewSliderImage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        getSliders()
    },[])
    
    const getSliders=async()=>{
      try{
         let res =  await axios.get(`${import.meta.env.VITE_URL}/sliders`)
         dispatch(STORE_SLIDERS(res.data))
      }
      catch(err){toast.error(err.message)}
    }
  
    const sliders = useSelector(selectsliders)
    let handleDelete=async(id)=>{
        if(window.confirm("are you sure to delete this??")){
          try{
            await axios.delete(`${import.meta.env.VITE_URL}/sliders/${id}`)
            toast.success("image deleted")
            getSliders()
          }
          catch(err){toast.error(err.message)}
        }
      }
  return (
  <div className='container-fluid shadow p-3'>
        <h1 className='text-center'>Slider Images</h1><hr/>
      <div class="table-responsive"  >
        <table class="table table-bordered table-striped"   >
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.length==0 && <tr><td colSpan={5} className='text-center'>No Image Found</td></tr>}
            {sliders.map((s,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{s.title}</td>
                <td>{s.desc}</td>
                <td><img src={s.image} width={50} height={50}/></td>
                <td>
                  <Link type="button" class="btn btn-success me-2" to={`/admin/editslider/${s.id}`}> <BsPen/> </Link>
                  <button type="button" class="btn btn-danger" onClick={()=>handleDelete(s.id)} > <BsTrash/> </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewSliderImage
