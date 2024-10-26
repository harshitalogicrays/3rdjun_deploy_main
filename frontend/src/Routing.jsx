import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Admin/Dashboard";
import { Protected, ProtectedAdmin } from "./components/hiddenlinks";
import AdminLayout from "./components/Admin/AdminLayout";
import AddCar from "./components/Admin/AddCar";
import ViewCars from "./components/Admin/ViewCars";
import AddSliderImage from "./components/Admin/AddSliderImage";
import ViewSliderImage from "./components/Admin/ViewSliderImage";
import Cars from "./components/Cars";
import CarDetails from "./components/CarDetails";
import Checkout from "./components/Checkout";
import CheckoutPayment from "./components/CheckoutPayment";
import Rentals from "./components/Admin/Rentals";
import Bookings from "./components/Admin/Bookings";
import ViewBooking from "./components/Admin/ViewBooking";
import BookingHistory from "./components/BookingHistory";

const router  = createBrowserRouter([
    {path:'/',element:<App/>,
        children:[
            {path:'',element:<Home/>},
            {path:'login',element:<Login/>},
            {path:'register',element:<Register/>},
            {path:'cars',element:<Cars/>},
            {path:'car/details/:id',element:<CarDetails/>},
            {path:'checkout',element:<Checkout/>},
            {path:'checkoutpayment',element:<CheckoutPayment/>},
            {path:'history',element:<Protected><BookingHistory/></Protected>}
        ]
    },
    {path:'/admin',element:<ProtectedAdmin><AdminLayout/></ProtectedAdmin>,
        children:[
            {path:'',element:<Dashboard/>},
            {path:'addcar',element:<AddCar/>},
            {path:'viewcar',element:<ViewCars/>},
            {path:'editcar/:id',element:<AddCar/>},
            {path:'addslider',element:<AddSliderImage/>},
            {path:'viewslider',element:<ViewSliderImage/>},
            {path:'editslider/:id',element:<AddSliderImage/>},
            {path:'rentals',element:<Rentals/>},
            {path:'bookings',element:<Bookings/>},
            {path:'bookings/view/:id',element:<ViewBooking/>}
        ]
    },
    {path:"*",element:<PageNotFound/>}
])
export default router