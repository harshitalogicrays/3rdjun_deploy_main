import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
    const [isOpen,setIsOpen]=useState(true)
    const closeSidebar = ()=>setIsOpen(false)
    const openSideBar = ()=>setIsOpen(true)
    const contentStyle = {
        transition: 'margin-left 0.3s',
        marginLeft: isOpen ? '250px' : '0',
        padding:'10px'
      };
  return (
    <>
        <ToastContainer position="bottom-left" autoClose={2000}
    hideProgressBar={true} newestOnTop={false}   closeOnClick
    rtl={false} pauseOnFocusLoss={false}   draggable  pauseOnHover={false} theme="colored"
    />
    <div className='d-flex'>
        <Sidebar open={isOpen} close={closeSidebar}/>
        <div className="flex-grow-1">
            <AdminHeader openSideBar={openSideBar}/>
            <div style={contentStyle}>
                <Outlet/>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminLayout
