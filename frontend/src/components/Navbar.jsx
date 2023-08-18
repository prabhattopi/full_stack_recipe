import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.avif"
import useAuth from '../hooks/useAuth';
const Navbar = () => {
    const { logout } = useAuth();

    return (
        <div className="sticky top-0 z-20 bg-gray-800 p-4 flex justify-between items-center px-4">
            <Link to="/">
            <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-35px">Recipe</h1>
            <img className="object-cover rounded-full" width="50px" height="50px" src={Logo} alt="RecipeImage"/>

            </div>
            </Link>
     
   
            <button className="text-white" onClick={async()=>{await logout()}}>Logout</button>
        </div>
    );
};

export default Navbar;
