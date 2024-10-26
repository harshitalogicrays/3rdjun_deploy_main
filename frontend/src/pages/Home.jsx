import React from 'react'
import Slider from '../components/Slider'
import Services from '../components/Services'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Slider/>
      <About/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default Home
