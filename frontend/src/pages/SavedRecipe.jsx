import React, { useEffect } from 'react'
import useRecipe from '../hooks/useRecipe'
import {Link} from "react-router-dom"
const SavedRecipe = () => {
    const {state}=useRecipe()
    return (
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 px-8 py-4">
        {state.savedRecipe?.length > 0 ? (
            state.savedRecipe?.map((recipe) => (
                <div key={recipe.id} className="flex flex-col rounded-lg shadow-xl w-[20rem] h-[18rem] relative">
                    <Link to={`/${recipe.id}`}>
                        <div className="w-full h-[13rem] rounded-lg flex items-center justify-center mt-2">
                            <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className="flex items-center justify-center font-bold text-2xl mt-2">
                            <h2>{recipe.title?.substring(0, 17)}...</h2>
                        </div>
                    </Link>
                </div>
            ))
        ) : (
            <h1 className="text-center text-2xl mt-8">Sorry No Data Available</h1>
        )}
    </div>
    )
}

export default SavedRecipe
