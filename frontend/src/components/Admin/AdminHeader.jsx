import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT_USER, selectIsLoggedIn } from '../../redux/authSlice'
import { toast } from 'react-toastify'

const AdminHeader = ({openSideBar}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    let handleLogout = () => {
            dispatch(LOGOUT_USER())
            toast.success("LoggedOut Successfully")
            navigate('/')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-toggler-icon" style={{cursor:'pointer'}} onClick={openSideBar}></span>
                <Link className="navbar-brand" to='/admin'>Admin Panel</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item"> <a className="nav-link">Welcome Admin</a>   </li>
                        <li className="nav-item" onClick={handleLogout}>
                            <button className="nav-link" > Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminHeader
