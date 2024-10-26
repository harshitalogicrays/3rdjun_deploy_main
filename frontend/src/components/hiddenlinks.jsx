import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn, selectRole } from "../redux/authSlice"

export const ShowOnLogin=({children})=>{
const isLoggedIn = useSelector(selectIsLoggedIn)
if(isLoggedIn){return children }
else  return null
}

export const ShowOnLogout=({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(!isLoggedIn){return children }
    else  return null
}


export const Protected = ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const role = useSelector(selectRole)
    if(isLoggedIn && role=="1"){return children}
    else return <Navigate to='/login' replace={true}/>
}

export const ProtectedAdmin = ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const role = useSelector(selectRole)
    if(isLoggedIn){
            if(role=="0")return children
            else return <Navigate to='/' replace={true}/>
        }
    else return <Navigate to='/login' replace={true}/>
}

export const calculateprice=(price,startDate,endDate)=>{
    const days = (endDate-startDate)/(1000*60*60*24) 
    return days>0?days*price :price
}