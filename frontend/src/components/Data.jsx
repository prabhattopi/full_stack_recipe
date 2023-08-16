import React,{useState} from 'react'
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"


const Data = () => {
    const [fill,setFill]=useState(false)
    return (
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 px-8 py-4">
            <div className="flex flex-col rounded-lg shadow-xl w-[20rem] h-[26rem] relative">
            <button onClick={()=>setFill(!fill)} className="absolute right-0 top-5 cursor-pointer z-10">
                    {
                        !fill?(<AiOutlineHeart className="text-red-500" size={30}/>):(<AiFillHeart className="text-red-500" size={30}/>)
                    }
               
                </button>
               
                <div className="w-full h-[13rem] rounded-lg flex items-center justify-center mt-2">
               
                <img className="w-full h-full object-cover" src="https://w7.pngwing.com/pngs/426/730/png-transparent-logo-yellow-font-recipe-logo-art-yellow.png" alt=""/>
                </div>
                <div className="flex items-center justify-center font-bold text-2xl mt-2">
                    <h2>The world Recipe</h2>
                </div>
                 <div className="flex items-center justify-center mt-4 text-gray-500">
                     <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam obcaecati reiciendis fugiat quia expedita magnam laborum? Eum, non. Fugiat expedita harum explicabo illo quae deserunt et blanditiis assumenda sint!</p>
                 </div>
              
                 
            </div>
            
            <div className="flex flex-col rounded-lg shadow-2xl w-[20rem] h-[26rem]">
                <div className="w-34 h-[13rem] rounded-lg flex items-center justify-center mt-2">
                <img className="w-full h-full object-contain" src="https://w7.pngwing.com/pngs/426/730/png-transparent-logo-yellow-font-recipe-logo-art-yellow.png" alt=""/>
                </div>
                <div className="flex items-center justify-center font-bold text-2xl mt-2">
                    <h2>The world Recipe</h2>
                </div>
                 <div className="flex items-center justify-center mt-4 text-gray-500">
                     <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam obcaecati reiciendis fugiat quia expedita magnam laborum? Eum, non. Fugiat expedita harum explicabo illo quae deserunt et blanditiis assumenda sint!</p>
                 </div>
              
                 
            </div>
            <div className="flex flex-col rounded-lg shadow-2xl w-[20rem] h-[26rem]">
                <div className="w-34 h-[13rem] rounded-lg flex items-center justify-center mt-2">
                <img className="w-full h-full object-contain" src="https://w7.pngwing.com/pngs/426/730/png-transparent-logo-yellow-font-recipe-logo-art-yellow.png" alt=""/>
                </div>
                <div className="flex items-center justify-center font-bold text-2xl mt-2">
                    <h2>The world Recipe</h2>
                </div>
                 <div className="flex items-center justify-center mt-4 text-gray-500">
                     <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam obcaecati reiciendis fugiat quia expedita magnam laborum? Eum, non. Fugiat expedita harum explicabo illo quae deserunt et blanditiis assumenda sint!</p>
                 </div>
              
                 
            </div>
            <div className="flex flex-col rounded-lg shadow-2xl w-[20rem] h-[26rem]">
                <div className="w-34 h-[13rem] rounded-lg flex items-center justify-center mt-2">
                <img className="w-full h-full object-contain" src="https://w7.pngwing.com/pngs/426/730/png-transparent-logo-yellow-font-recipe-logo-art-yellow.png" alt=""/>
                </div>
                <div className="flex items-center justify-center font-bold text-2xl mt-2">
                    <h2>The world Recipe</h2>
                </div>
                 <div className="flex items-center justify-center mt-4 text-gray-500">
                     <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam obcaecati reiciendis fugiat quia expedita magnam laborum? Eum, non. Fugiat expedita harum explicabo illo quae deserunt et blanditiis assumenda sint!</p>
                 </div>
              
                 
            </div>
           
        </div>
    )
}

export default Data
