import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCars, selectCars } from '../redux/carSlice'
import CarItems from './CarItems'
import { FILTER_BY_CAPACITY, FILTER_BY_FUEL, selectCapacity, selectfilters, selectFuel, selectSearch } from '../redux/filterSlice'
import cssmodule from '../pages/pagenotfound.module.css'

const Cars = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCars())
  }, [])
  const allcars = useSelector(selectCars)
  const cars = allcars.filter(item => item.availability == true)
  const carscapacity = cars.map(item => item.capcity)
  const carscap = Array.from(new Set(carscapacity)) //unique values from array

  //filter 
  const filterdata =useSelector(selectfilters)
  const searchval =useSelector(selectSearch)
  const capval=useSelector(selectCapacity)
  const fuelVal=useSelector(selectFuel)

  //
  let [capacity,setCapacity]=useState('')
  useEffect(()=>{
    dispatch(FILTER_BY_CAPACITY({cars,capacity}))
  },[capacity])

  let fueltypes = ["Petrol","Diesel","CNG","EV"]
  let [fuelType,setFuelType]=useState('')
  useEffect(()=>{
    dispatch(FILTER_BY_FUEL({cars,fuelType}))
  },[fuelType])
  return (
    <div className='row'>
      <div className="col-2">
      <ul class="nav flex-column mt-4">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Fuel Type</a>
               <div className='ms-3'>
               {fueltypes.map((fuel,index)=>  
               <div key={index} style={{ cursor: 'pointer', color: fuelType === fuel ? 'blue' : 'black' }} onClick={() => setFuelType(fuel)}>
                {fuel}
              </div>)}
                </div>
        </li>
        <hr/>
        <li class="nav-item">
          <a class="nav-link" href="#">Capacity</a>
          {carscap.map((car,i)=>
          <div class="form-check ms-3" key={i}>
            <input class="form-check-input" type="radio" name="capacity" value={car} 
            onChange={(e)=>setCapacity(e.target.value)}/>
            <label class="form-check-label" for=""> {car} seater </label>
          </div>
          )}
        </li>
        <hr/>
      </ul>
      </div>
      <div className="col">   
        {(searchval=='' &&  capval=="" && fuelVal=="")? <CarItems cars={cars} />  :
        <>
       {filterdata.length==0 ? <h1 className={cssmodule.notfound}>No Car Found</h1>
        :
        <CarItems cars={filterdata} />
       }
       </>
       
        }               
        </div>
    </div>
  )
}

export default Cars
