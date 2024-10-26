import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginImg from '/src/assets/images/login.png'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { LOGIN_USER } from '../redux/authSlice'
const Login = () => {
  const dispatch = useDispatch()
  let [email,setEmail] =useState('')
  let [password,setPassword]=useState('')
  const navigate = useNavigate()
  const location = useLocation()
  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      let res  = await fetch(`${import.meta.env.VITE_URL}/users?email=${email}`)
      let data = await res.json()
      if(data.length==0){toast.error("Invalid Credentials")}
      else{
         if(data[0].password == password){
            if(data[0].role=="0"){
              toast.success("loggedIn successfully")
              navigate('/admin')
            }
            else{
              toast.success("loggedIn successfully")
                let redirectTo = location.state ? location.state.from :'/'
              navigate(redirectTo ,{state:{startDate:location.state?.startDate ?? undefined,endDate:location.state?.endDate ?? undefined}})
            }  
            let obj = {email:data[0].email,name:data[0].username,id:data[0].id,role:data[0].role} 
            dispatch(LOGIN_USER(obj))  
         }
         else toast.error("Invalid Credentials") 
       }
      }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
        <img src={LoginImg} className='img-fluid'/>
        </div>
        <div className="col mt-5">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="" class="form-label">Email</label>
              <input type="text" name="email" class="form-control" value={email}
              onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" 
              value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className="d-grid gap-2">
            <button  type="submit" class="btn btn-primary" > Login </button>
            </div>
          </form>
          <hr/>
          <p>Create an account?? <Link to='/register' className='text-decoration-none'>SignUp</Link></p>
        </div>
      </div>
   </div>
  )
}

export default Login
