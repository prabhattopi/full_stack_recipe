import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import useAuth from "./hooks/useAuth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SavedRecipe from "./pages/SavedRecipe"
import SinglePages from "./pages/SinglePages"
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
         <Route path="/:id" element={<PrivateRoutes><SinglePages/></PrivateRoutes>}/>
         <Route path="/savedrecipe" element={<PrivateRoutes><SavedRecipe/></PrivateRoutes>}/>
         <Route path="/signup" element={<PublicRoutes><Signup/></PublicRoutes>}/>
         <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>}/>
     </Routes>
    </>
  )
}

export default App
