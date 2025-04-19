
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import { Footer } from "./components/footer"
import { About } from "./pages/about/about.jsx"
import { Contact } from "./pages/contact/Contact"
import { Services } from "./pages/services/Services.jsx"
import { Shop } from "./pages/shop/Shop.jsx"
import { Allappointments } from "./pages/appointment/Allappointments.jsx"
import { Appointment } from "./pages/appointment/Appointments.jsx"
import { Profile } from "./pages/profile/Profile.jsx"
import AOS from "aos";
// import "aos/dist/aos.css";
import { useEffect } from "react"
import { Product } from "./pages/shop/Product.jsx"
import { MyAppointments } from "./pages/appointment/MyAppointments.jsx"
import { Cart } from "./pages/cart/Cart.jsx"
import { Myorders } from "./pages/cart/MyOrders.jsx";
import TermsOfUse from "./pages/TermsAndCondition.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import OAuthSuccess from "./components/Oauthsuccess.jsx";






const App = () => {







  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      offset: 120,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
    
    
  }, []);


  return (
    <>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/allappointments" element={<Allappointments/>}/>
        <Route path="/allappointments/:id" element={<Appointment/>}/>
        <Route path="/myappointments" element={<MyAppointments/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shop/:id" element={<Product/>}/>
        <Route path="/myprofile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="myorders" element={<Myorders/>}/>
        <Route path="terms-and-condition" element={<TermsOfUse/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App;