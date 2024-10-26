import React, { useState } from 'react'
import RegisterImg from '/src/assets/images/register.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Register = () => {
  let initialState = {username:"",email:'',password:'',cpassword:'',role:'1'}
  let [user,setUser]=useState({...initialState})
  const navigate = useNavigate()
  let handleRegister=async(e)=>{
    e.preventDefault()
    try{
      await fetch(`${import.meta.env.VITE_URL}/users`,
        {method:"POST",
          headers:{'content-type':'application/json',
            'cookie':'',
            'authorization':'Bearer token',
            'xyz':1010,
            'author':'harshita'
          },
          body:JSON.stringify(user)
        }
      )
      toast.success("registered successfully")
      navigate('/login')
    }
    catch(err){
      toast.error(err.message)
    }
  }
  return (
   <>
   <div className="container mt-2">
    <h1>Register Here</h1><hr/>
      <div className="row">
        <div className="col">
        <img src={RegisterImg} className='img-fluid'/>
        </div>
        <div className="col">
          <form onSubmit={handleRegister}>
            <div class="mb-3">
              <label for="" class="form-label">Username</label>
              <input type="text" name="username" class="form-control"  
              value={user.username}
              onChange={(e)=>setUser({...user,username:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Email</label>
              <input type="text" name="email" class="form-control"   value={user.email}
              onChange={(e)=>setUser({...user,email:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password" name="password" class="form-control"  
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})} />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Confirm Password</label>
              <input type="password" name="cpassword" class="form-control" 
               value={user.cpassword}
               onChange={(e)=>setUser({...user,cpassword:e.target.value})} />
            </div>
            <div className="d-grid gap-2">
            <button  type="submit" class="btn btn-primary" > Submit </button>
            </div>
          </form>
          <hr/>
          <p>Already an account?? <Link to='/login' className='text-decoration-none'>SignIn</Link></p>
        </div>
      </div>
   </div>
   </>
  )
}

export default Register
