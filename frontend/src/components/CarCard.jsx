import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RenatlModal from './RenatlModal'
const CarCard = ({c}) => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const handleRentNow=()=>{
    setIsModalOpen(true)
  }
  return (
    <>
    <div className="col-3 mb-3" key={c.id}>
    <div class="card">
        <Link  to={`/car/details/${c.id}`}>
        <img class="card-img-top" src={c.image} alt={c.model} height={200}/></Link>
        <div class="card-body">
            <h4 class="card-title">{c.model}</h4>
            <p class="card-text"><span>{c.fuel}</span><span className='float-end'>{c.capcity} seater</span></p>
            <p>&#8377;{c.price}</p>
            <button type="button" class="btn btn-danger me-5" onClick={handleRentNow}>Rent Now</button>
            <Link type="button" class="btn btn-primary" to={`/car/details/${c.id}`}>View</Link>
        </div>
    </div>
    </div>
    <RenatlModal car={c} isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
    </>
  )
}

export default CarCard
