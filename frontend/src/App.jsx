import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  // console.log(import.meta.env.VITE_URL)
  return (
   <>
   <ToastContainer position="bottom-left" autoClose={2000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
theme="colored"
/>
    <Navbar/>
    <Outlet/>
   </>
  )
}

export default App
