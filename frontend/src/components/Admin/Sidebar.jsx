import React, { Fragment } from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';
const Sidebar = ({open,close}) => {
    const contentStyle = {
        transition: 'opacity 0.8s',
        opacity: open ? 1 : 0,
        visibility:open?'visible':'hidden'
      };
      let links = [
        {id:1,to:'/admin',text:"Dashboard"},
        {id:2,to:'/admin/addcar',text:"Add Car"},
        {id:3,to:'/admin/viewcar',text:"View Cars"},
        {id:4,to:'/admin/addslider',text:"Add Slider Image"},
        {id:5,to:'/admin/viewslider',text:"View Slider Image"},
        {id:6,to:'/admin/rentals',text:"Rentals"},
        {id:7,to:'/admin/bookings',text:"Bookings"},
      ]
  return (
    <div className="sidebar" style={contentStyle}>
      <button type="button" className='btn-close float-end' onClick={close}></button>
      <ul className='nav flex-column mt-5'>
      <li class="nav-item">
        {links?.map(link=><Fragment key={link}> <NavLink  class="nav-link" to={link.to}   className={({ isActive }) =>
            isActive ? "active text-danger bg-info nav-link fw-bold" : "nav-link"
              } end >{link.text}</NavLink>
              </Fragment>
        )}
       
        
    </li>
      </ul>
    </div>
  )
}

export default Sidebar
