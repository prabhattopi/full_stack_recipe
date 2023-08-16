import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SinglePage from "./pages/SinglePage"



function App() {


  return (
    <>
     <Navbar/>
     <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/:id" element={<SinglePage/>}/>
     </Routes>
    </>
  )
}

export default App
