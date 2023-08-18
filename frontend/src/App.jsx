import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import useAuth from "./hooks/useAuth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SinglePage from "./pages/SinglePage"
import Signup from "./pages/Singup"
import PrivateRoutes from "./routes/PrivateRoutes"
import PublicRoutes from "./routes/PublicRoutes"



function App() {
const {user}=useAuth()

  return (
    <>
     {user&&<Navbar/>}
     <Routes>
         <Route path="/" element={<PrivateRoutes><Home/></PrivateRoutes>}/>
         <Route path="/:id" element={<SinglePage/>}/>
         <Route path="/signup" element={<PublicRoutes><Signup/></PublicRoutes>}/>
         <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>}/>
     </Routes>
    </>
  )
}

export default App
