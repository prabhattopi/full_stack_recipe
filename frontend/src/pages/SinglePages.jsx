import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md'; // Import the close icon from react-icons
import ReactHtmlParser from 'react-html-parser'; // Import the react-html-parser library

import useRecipe from '../hooks/useRecipe';

let tasteData={
    
        "sweetness": 28.79,
        "saltiness": 26.74,
        "sourness": 6.22,
        "bitterness": 12.38,
        "savoriness": 11.8,
        "fattiness": 100,
        "spiciness": 0
    
}
const SinglePages = () => {
    const { id } = useParams();
    const { singleRecipeInformation, dispatch, state } = useRecipe();
    const [activeComponent, setActiveComponent] = useState(null);

    useEffect(() => {
       

        const getSingleData = async () => {
            await singleRecipeInformation(id)
        };

 
            getSingleData();
        

        return () => {
            dispatch({ type: 'RESET_SINGLE' });
   
          
        };
    }, [id]);

    const handleComponentClick = (component) => {
        setActiveComponent(component);
    };

    const handleCloseComponent = () => {
        setActiveComponent(null);
    };
console.log(state.singleRecipe)
if(state.loading){
    return (
        <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 sm:h-20 sm:w-20"></div>
    </div>
   )
}
    return (
        <div className="bg-gray-100 min-h-[calc(100vh-82px)]">
           
            <div className="p-6 sm:flex">
                {/* Recipe Information */}
                <div className="flex flex-col flex-wrap flex-1 items-center lg:flex-row">
                    {/* Image information */}
                    <div className="sm:mr-6 mb-4 sm:mb-0">
                        <img
                          className="width-full h-full object-cover"
                            src={ state.singleRecipe?.recipeInformations?.image}
                            alt={ state.singleRecipe?.recipeInformations?.title}
                        />
                    </div>
                    {/* Title Summary */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold mb-2">{ state.singleRecipe?.recipeInformations?.title}</h1>
                        <p className="text-gray-600">
                           {
                               ReactHtmlParser(
                                state.singleRecipe?.recipeInformations?.summary
                               )
                                
                           }
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-x-4 space-y-4">
                <button
                    className={`py-2 px-4 rounded ${
                        activeComponent === 'nutrition' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => handleComponentClick('nutrition')}
                >
                    Nutritions Details
                </button>
                <button
                    className={`py-2 px-4 rounded ${
                        activeComponent === 'ingredients' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => handleComponentClick('ingredients')}
                >
                    Ingredients Details
                </button>
                <button
                    className={`py-2 px-4 rounded ${
                        activeComponent === 'tastes' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => handleComponentClick('tastes')}
                >
                    Tastes Details
                </button>
            </div>

            {activeComponent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-4 sm:p-6 bg-white rounded shadow w-full max-w-md relative">
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800"
                            onClick={handleCloseComponent}
                        >
                            <MdClose size={20} />
                        </button>
                        <div className="h-[calc(100dvh-14rem)] overflow-y-auto">
                            {activeComponent === 'nutrition' && (
                                <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
                                    
                                    {
                                        state.singleRecipe?.nutrition?.map(e=>(
                                            <div key={e.name} className="flex shadow-md px-4 py-4 w-full h-auto">
                                                <span className="font-bold">{e.name}</span>
                                                <span className="font-bold text-gray-600">: {e.amount}{e.unit}</span>
                                         
                                            </div>
                                        ))
                                    }
                                    {/* ... */}
                                </div>
                            )}

                            {activeComponent === 'ingredients' && (
                                <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
                                    {
                                        state.singleRecipe?.ingredients?.map(e=>(
                                            <div key={e.name} className="flex items-center gap-2 shadow-md px-4 py-4 w-full h-auto">
                                                <div>
                                                    <img className="rounded-full object-cover" src={`https://spoonacular.com/cdn/ingredients_100x100/${e.image}`} alt={e.name}/>
                                                </div>
                                                <div className="flex flex-col gap-2 justify-center">
                                                <span className="font-bold uppercase">{e.name}</span>
                                                <div className="flex gap-1">
                                                    <span className="font-bold">
                                                        metric
                                                    </span>
                                                <span className="font-bold text-gray-600">:{e.amount.metric.value}{e.amount.metric.unit}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <span className="font-bold">
                                                        US
                                                    </span>
                                                <span className="font-bold text-gray-600">:{e.amount.us.value}{e.amount.us.unit}</span>
                                                </div>
                                            
                                    
                                                </div>
                                            
                                     
                                        </div>

                                        ))
                                    }
                                    {/* ... */}
                                </div>
                            )}

                            {activeComponent === 'tastes' && (
                               <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
                                    
                               {
                                  Object.keys(tasteData)?.map(e=>(
                                       <div key={e} className="flex shadow-md px-4 py-4 w-full h-auto">
                                           <span className="font-bold">{e}</span>
                                           <span className="font-bold text-gray-600">: {state.singleRecipe?.taste[e]}</span>
                                    
                                       </div>
                                   ))
                               }
                               {/* ... */}
                           </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePages;
