import React from 'react'
import cssmodule from './pagenotfound.module.css'
const PageNotFound = () => {
  return (
    <div className={cssmodule.notfound}>
     <h1 style={{fontSize:'50px',textAlign:'center'}}>404</h1>
     <h2 style={{fontSize:'40px'}}>Not Found</h2>
    </div>
  )
}

export default PageNotFound
