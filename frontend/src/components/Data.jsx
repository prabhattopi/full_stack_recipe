import React,{useState} from 'react'
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import { Link } from 'react-router-dom'
import useRecipe from '../hooks/useRecipe'


const Data = () => {
    const [fill,setFill]=useState(false)
    const {state}=useRecipe()
   if(state.loading){
       return (
            <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 sm:h-20 sm:w-20"></div>
        </div>
       )
   }

    return (
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 px-8 py-4">
            {
                state.recipes?.length>0?(
                    state.recipes?.map(e=>(
<div key={e.id} className="flex flex-col rounded-lg shadow-xl w-[20rem] h-[18rem] relative">
            <button onClick={()=>setFill(!fill)} className="absolute right-2 bottom-0 cursor-pointer z-10">
                    {
                        !fill?(<AiOutlineHeart className="text-red-500" size={30}/>):(<AiFillHeart className="text-red-500" size={30}/>)
                    }
               
                </button>
                <Link to={`/${e.id}`}>
                <div className="w-full h-[13rem] rounded-lg flex items-center justify-center mt-2">
               
                <img className="w-full h-full object-cover" src={e.image} alt={e.title}/>
                </div>
                <div className="flex items-center justify-center font-bold text-2xl mt-2">
                    <h2>{e.title.substring(0,17)}...</h2>
                </div>
                </Link>
               
                
                 
            </div>
                    ))

                ):(
                  <h1 className="text-center text-2xl mt-8">Sorry No Data Available</h1>
                )
            }
            
            
           
        </div>
    )
}

export default Data
